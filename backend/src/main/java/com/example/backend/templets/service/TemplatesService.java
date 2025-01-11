package com.example.backend.templets.service;

import com.example.backend.templets.model.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TemplatesService {

    private final TemplateRepository templateRepository;
    private final ChatGptService chatGptService;
    private final EmailService emailService;

    public void getTemplates() {
    }
}
