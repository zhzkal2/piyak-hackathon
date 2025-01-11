package com.example.backend.folders.model.request;

import com.example.backend.mail.model.request.EmailRequest;
import lombok.Data;

@Data
public class RequestData extends EmailRequest {
    private Form4 form4;

    private String state;

    @Data
    public static class Form4 {
        private String generatedTitle;   // 생성된 제목
        private String generatedContent; // 생성된 내용
    }
}