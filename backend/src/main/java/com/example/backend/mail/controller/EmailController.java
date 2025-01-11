package com.example.backend.mail.controller;

import com.example.backend.mail.model.request.EmailRequest;
import com.example.backend.mail.model.response.EmailResponse;
import com.example.backend.mail.service.ChatGptService;
import com.example.backend.mail.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

    private final ChatGptService chatGptService;
    private final EmailService emailService;

    // 모든 메일 응답 조회
    @GetMapping("/all")
    public ResponseEntity<List<EmailResponse>> getAllEmails(@RequestParam String recipientMail) {
        List<EmailResponse> emails = emailService.getAllEmails(recipientMail);
        return ResponseEntity.ok(emails);
    }

    // 저장된 메일 응답 조회
    @GetMapping("/saved")
    public ResponseEntity<List<EmailResponse>> getSavedEmails(@RequestParam String recipientMail) {
        List<EmailResponse> emails = emailService.getSavedEmails(recipientMail);
        return ResponseEntity.ok(emails);
    }

    // 전송된 메일 응답 조회
    @GetMapping("/sent")
    public ResponseEntity<List<EmailResponse>> getSentEmails(@RequestParam String recipientMail) {
        List<EmailResponse> emails = emailService.getSentEmails(recipientMail);
        return ResponseEntity.ok(emails);
    }

    @PostMapping("/generate-mail")
    public ResponseEntity<EmailResponse> generateEmail(@RequestBody EmailRequest emailRequest) {
        EmailResponse response = chatGptService.generateEmail(emailRequest);
        return ResponseEntity.ok(response);
    }
}