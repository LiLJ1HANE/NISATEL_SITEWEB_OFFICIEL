package com.nisatel.service;

import com.nisatel.model.ContactMessage;
import com.nisatel.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repo;
    private final EmailService emailService;

    public ContactMessageService(ContactMessageRepository repo, EmailService emailService) {
        this.repo = repo;
        this.emailService = emailService;
    }

    public ContactMessage save(ContactMessage message) {
        ContactMessage saved = repo.save(message);   // ✅ 1. on sauvegarde
        emailService.sendContactNotification(saved); // ✉️ 2. on envoie l'email
        return saved;
    }

    public List<ContactMessage> getAll() {
        return repo.findAll();
    }
}
