package com.example.backend.folders.model.repository;

import com.example.backend.folders.model.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {
}
