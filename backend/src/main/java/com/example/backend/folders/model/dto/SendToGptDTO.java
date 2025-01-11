package com.example.backend.folders.model.dto;

import lombok.Data;
import lombok.Setter;

@Setter
@Data
public class SendToGptDTO {

    private Form1 form1;  // Form1 필드
    private Form2 form2;  // Form2 필드
    private Form3 form3;  // Form3 필드

    @Data
    public static class Form1 {
        private String name;           // 내 이름
        private String job;            // 내 직업
        private String affiliation;    // 내 소속
        private String number;         // 내 학번
    }

    @Data
    public static class Form2 {
        private String recipientName;  // 보낼 사람 이름
        private String recipientMail;  // 보낼 이메일
        private String fileToSend;     // 보낼 파일
    }

    @Data
    public static class Form3 {
        private String situation;      // 상황
        private String desiredAnswer;  // 원하는 답변
        private String tone;           // 말투
    }
}
