package com.example.backend.mail.service;

import com.example.backend.mail.model.repository.EmailResponseRepository;
import com.example.backend.mail.model.request.EmailRequest;
import com.example.backend.mail.model.response.EmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.json.JSONObject;

@Service
@Log4j2
@RequiredArgsConstructor
public class ChatGptService {

    private final EmailResponseRepository emailResponseRepository;
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Value("${openai.api.key}")
    private String apiKey;

    public EmailResponse generateEmail(EmailRequest emailRequest) {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        log.info("Using OpenAI API Key: {}", apiKey);

        // ChatGPT 프롬프트 생성
        String prompt = createPrompt(emailRequest);

        // 요청 본문
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "gpt-4o-mini-2024-07-18");
        requestBody.put("messages", new JSONArray()
                .put(new JSONObject().put("role", "system").put("content", "You are an email assistant."))
                .put(new JSONObject().put("role", "user").put("content", prompt))
        );
        requestBody.put("max_tokens", 500);

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        try {
            // ChatGPT API 호출
            ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

            // 결과 반환
            JSONObject responseBody = new JSONObject(response.getBody());
            String content = responseBody.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");

            // 제목 생성
            String title = createTitle(emailRequest);

            // EmailResponse 객체 생성
            EmailResponse emailResponse = new EmailResponse();
            emailResponse.setGeneratedTitle(title);
            emailResponse.setGeneratedContent(content);

            // DB에 저장
            emailResponseRepository.save(emailResponse);

            // 저장된 응답 반환
            return emailResponse;

        } catch (HttpClientErrorException e) {
            log.error("HTTP Status: " + e.getStatusCode());
            log.error("Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Failed to generate email. Please try again later.");
        }
    }

    public EmailResponse getEmailResponseById(Long id) {
        // EmailResponse 조회 로직
        return emailResponseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EmailResponse with id " + id + " not found."));
    }

    private String getEtiquetteGuidance(String language) {
        switch (language.toLowerCase()) {
            case "english":
                return "Please compose the email in English only.";
            case "korean":
                return "이메일을 한국어로만 작성해주세요.";
            case "japanese":
                return "メールを日本語でのみ作成してください。";
            case "chinese":
                return "请仅使用中文撰写邮件。";
            case "french":
                return "Veuillez rédiger l'email uniquement en français.";
            case "german":
                return "Bitte verfassen Sie die E-Mail ausschließlich auf Deutsch.";
            default:
                return "Please compose the email in the specified language only.";
        }
    }

    private String createPrompt(EmailRequest emailRequest) {
        String etiquetteGuidance = getEtiquetteGuidance(emailRequest.getLanguage());
        return String.format(
                "Create a professional email in %s language following this etiquette: %s\n" +
                        "From: %s (%s, %s, %s)\n" +
                        "To: %s (%s)\n" +
                        "Situation: %s\n" +
                        "Expected Reply: %s\n" +
                        "Tone: %s" +
                        "The email should avoid including any subject line or additional metadata, or sender's phone number.",
                emailRequest.getLanguage(),
                etiquetteGuidance,
                emailRequest.getForm1().getName(),
                emailRequest.getForm1().getAffiliation(),
                emailRequest.getForm1().getNumber(),
                emailRequest.getForm1().getJob(),
                emailRequest.getForm2().getRecipientName(),
                emailRequest.getForm2().getRecipientMail(),
                emailRequest.getForm3().getSituation(),
                emailRequest.getForm3().getDesiredAnswer(),
                emailRequest.getForm3().getTone()
        );
    }

    private String createTitle(EmailRequest emailRequest) {
        return String.format(
                "[%s] %s",
                emailRequest.getForm1().getAffiliation(),
                emailRequest.getForm3().getSituation()
        );
    }
}