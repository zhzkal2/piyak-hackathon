package com.example.backend.mail.model.repository;

import com.example.backend.mail.model.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Integer> {
}