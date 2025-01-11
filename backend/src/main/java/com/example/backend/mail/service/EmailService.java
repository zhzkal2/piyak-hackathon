package com.example.backend.mail.service;

import com.example.backend.mail.model.entity.Email;
import com.example.backend.mail.model.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;

    public Email saveEmail(Integer folderId, String title, String content) {
        Email email = new Email();
        email.setFolderId(folderId);
        email.setTitle(title);
        email.setContent(content);
        email.setCreatedAt(LocalDateTime.now());
        return emailRepository.save(email);
    }
}