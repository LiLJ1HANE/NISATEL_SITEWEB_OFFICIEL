package com.nisatel.controller;

import com.nisatel.model.ContactMessage;
import com.nisatel.service.ContactMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactMessageController {
    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ContactMessage submitMessage(@RequestBody ContactMessage msg) {
        return service.save(msg);
    }

    @GetMapping
    public List<ContactMessage> allMessages() {
        return service.getAll();
    }
}
