package com.example.backend.folders.controller;

import com.example.backend.folders.model.request.RequestData;
import com.example.backend.folders.service.FolderService;
import com.example.backend.mail.model.entity.Email;
import com.example.backend.mail.model.response.EmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/folder")
@Log4j2
public class FolderController {

    private final FolderService folderService;

    @PostMapping("/save")
    public ResponseEntity<EmailResponse> save(@RequestBody RequestData requestData) {
        if (requestData == null) {
            log.error("ERROR: requestData is null");
            return ResponseEntity.badRequest().build();
        }

        EmailResponse emailResponse = folderService.splitData(requestData);
        return ResponseEntity.ok(emailResponse);
    }
}
