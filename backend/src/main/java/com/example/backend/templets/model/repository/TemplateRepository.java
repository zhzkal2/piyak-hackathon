package com.example.backend.templets.model.repository;

import com.example.backend.templets.model.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepository extends JpaRepository<Template, Long> {
}
