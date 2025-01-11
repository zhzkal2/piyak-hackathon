package com.example.backend.folders.service;


import com.example.backend.folders.model.request.RequestData;
import com.example.backend.mail.model.request.EmailRequest;
import com.example.backend.mail.model.response.EmailResponse;
import com.example.backend.mail.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final ChatGptService chatGptService;

    public EmailResponse splitData(RequestData requestData) {
        return sendToGPT(requestData);
    }
    
    public EmailResponse sendToGPT(RequestData requestData) {
        EmailRequest emailRequest = convertToSendToEmailDTO(requestData);
        return chatGptService.generateEmail(emailRequest);
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
        form2.setFileToSend(requestData.getForm2().getFileToSend());
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
