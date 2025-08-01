package com.nisatel.service;

import com.nisatel.model.ContactMessage;
import com.nisatel.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {
    private final ContactMessageRepository repo;

    public ContactMessageService(ContactMessageRepository repo) {
        this.repo = repo;
    }

    public ContactMessage save(ContactMessage message) {
        return repo.save(message);
    }

    public List<ContactMessage> getAll() {
        return repo.findAll();
    }
}

