package com.nisatel.service;

import com.nisatel.model.User;
import com.nisatel.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User save(User user) {
        return repo.save(user);
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Optional<User> getByUsername(String username) {
        return repo.findByUsername(username);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
