package com.nisatel.controller;

import com.nisatel.model.OfferedService;
import com.nisatel.repository.ServiceRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*") // autorise le frontend
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<OfferedService> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public OfferedService addService(@RequestBody OfferedService service) {
        return serviceRepository.save(service);
    }
}
