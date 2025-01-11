package com.example.backend.folders.controller;

import com.example.backend.folders.model.dto.SendToGptDTO;
import com.example.backend.folders.model.request.RequestData;
import com.example.backend.folders.service.FolderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/folder")
@Log4j2
public class FolderController {


    private final FolderService folderService;

    @PostMapping("/save")
    public ResponseEntity<Void> save(@RequestBody RequestData requestData) {
        if(requestData != null) {
            folderService.splitData(requestData);
        }
        else {
            log.error("ERROR : folderRequest is not found");
        }

        return ResponseEntity.ok().build();
    }
}
