package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("manuna530@gmail.com");
        mailSender.setPassword("${mail.sender.password}");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com"); // 특정 호스트 신뢰
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");   // TLS 버전 지정
        props.put("mail.debug", "true"); // 디버깅 활성화

        return mailSender;
    }
}
