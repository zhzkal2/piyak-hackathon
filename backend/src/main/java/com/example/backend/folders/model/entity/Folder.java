package com.example.backend.folders.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;

    @Column(name ="organization")
    private String organization;

    @CreatedDate
    @Column(name = "created_at", updatable = false) // updatable = false는 수정이 불가능하도록 설정
    private LocalDateTime createdAt;

    public Folder(String name, String organization) {
        this.name = name;
        this.organization = organization;
    }
}
