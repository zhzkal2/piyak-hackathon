package com.example.backend.mail.model.repository;

import com.example.backend.mail.model.response.EmailResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailResponseRepository extends JpaRepository<EmailResponse, Long> {
}