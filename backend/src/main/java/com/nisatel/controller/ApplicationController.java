package com.nisatel.controller;

import com.nisatel.model.Application;
import com.nisatel.repository.ApplicationRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {
    private final ApplicationRepository repo;
    public ApplicationController(ApplicationRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Application> getAll() { return repo.findAll(); }
}

