package com.example.backend.folders.model.dto;

import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class SendToEmailDTO {
    private String name;
    private String recipientName;
    private String recipientMail;
    private String generatedTitle;
    private String generatedContent;
}
