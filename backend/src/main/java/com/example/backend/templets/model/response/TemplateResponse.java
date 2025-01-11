package com.example.backend.templets.model.response;

import lombok.Data;

@Data
public class TemplateResponse {
    private String title;
    private String content;
    private String date;
    private String recipientName;
}
