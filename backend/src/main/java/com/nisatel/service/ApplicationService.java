package com.nisatel.service;

import com.nisatel.model.Application;
import com.nisatel.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {
    private final ApplicationRepository repo;

    public ApplicationService(ApplicationRepository repo) {
        this.repo = repo;
    }

    public Application save(Application application) {
        return repo.save(application);
    }

    public List<Application> getAll() {
        return repo.findAll();
    }

    public Application getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
