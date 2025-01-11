package com.example.backend.mail.controller;

import com.example.backend.mail.model.request.EmailRequest;
import com.example.backend.mail.model.response.EmailResponse;
import com.example.backend.mail.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EmailController {

    private final ChatGptService chatGptService;

    @PostMapping("/generate-mail")
    public ResponseEntity<EmailResponse> generateEmail(@RequestBody EmailRequest emailRequest) {
        EmailResponse response = chatGptService.generateEmail(emailRequest);
        return ResponseEntity.ok(response);
    }
}