package com.example.backend.folders.controller;

import com.example.backend.folders.model.request.RequestData;
import com.example.backend.folders.service.FolderService;
import com.example.backend.mail.model.response.EmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/save-state")
    public HttpEntity<Object> saveState(@RequestBody EmailResponse emailResponse) {
        if (emailResponse == null) {
            log.error("ERROR: emailResponse is null");
        }
        else {
            folderService.saveEmailResponse(emailResponse);
        }
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}