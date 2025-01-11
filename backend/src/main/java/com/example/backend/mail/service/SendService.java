package com.example.backend.mail.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Random;

@Service
public class SendService {

    private final JavaMailSender javaMailSender;

    // 생성자 주입
    public SendService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    private String createCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);  // 6자리 랜덤 숫자
        return String.valueOf(code);
    }

    public String sendEmail(String recipient, String subject, String body) {
        String code = createCode();  // 인증 코드 생성

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false, "UTF-8");
            mimeMessageHelper.setTo(recipient);
            mimeMessageHelper.setSubject(subject);

            // 인증 이메일 내용 생성


            mimeMessageHelper.setText(body, true);  // HTML 형식으로 전송
            javaMailSender.send(message);  // 이메일 전송
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }

        return code;  // 인증 코드 반환
    }
}
