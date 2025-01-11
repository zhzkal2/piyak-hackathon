package com.example.backend.user.model.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phoneNum;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAffiliation> affiliations;
}