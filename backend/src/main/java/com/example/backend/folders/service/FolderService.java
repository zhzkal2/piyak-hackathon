package com.example.backend.folders.service;


import com.example.backend.folders.model.request.RequestData;
import com.example.backend.mail.model.repository.EmailResponseRepository;
import com.example.backend.mail.model.request.EmailRequest;
import com.example.backend.mail.model.response.EmailResponse;
import com.example.backend.mail.service.ChatGptService;
import com.example.backend.templates.service.TemplatesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final ChatGptService chatGptService;
    private final TemplatesService templatesService;
    private final EmailResponseRepository emailResponseRepository;

    public EmailResponse splitData(RequestData requestData) {
        return sendToGPT(requestData);
    }
    
    public EmailResponse sendToGPT(RequestData requestData) {
        EmailRequest emailRequest = convertToSendToEmailDTO(requestData);
        EmailResponse emailResponse = null;

        emailResponse = chatGptService.generateEmail(emailRequest);

        return emailResponse;
    }

    public void saveEmailResponse(EmailResponse emailResponse) {
        Optional<EmailResponse> emailResponse1 = emailResponseRepository.findById(emailResponse.getId());
        if(emailResponse1.isPresent()) {
            emailResponse1.get().setState(emailResponse.getState());
            emailResponseRepository.save(emailResponse1.get());
        }
    }

    private EmailRequest convertToSendToEmailDTO(RequestData requestData) {
        EmailRequest emailRequest = new EmailRequest();

        EmailRequest.Form1 form1 = new EmailRequest.Form1();
        form1.setName(requestData.getForm1().getName());
        form1.setJob(requestData.getForm1().getJob());
        form1.setAffiliation(requestData.getForm1().getAffiliation());
        form1.setNumber(requestData.getForm1().getNumber());
        emailRequest.setForm1(form1);

        EmailRequest.Form2 form2 = new EmailRequest.Form2();
        form2.setRecipientName(requestData.getForm2().getRecipientName());
        form2.setRecipientMail(requestData.getForm2().getRecipientMail());
        emailRequest.setForm2(form2);

        EmailRequest.Form3 form3 = new EmailRequest.Form3();
        form3.setSituation(requestData.getForm3().getSituation());
        form3.setDesiredAnswer(requestData.getForm3().getDesiredAnswer());
        form3.setTone(requestData.getForm3().getTone());
        emailRequest.setForm3(form3);

        emailRequest.setLanguage("EN");

        emailRequest.setState(requestData.getState());

        return emailRequest;
    }

}
