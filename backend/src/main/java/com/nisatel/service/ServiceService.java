package com.nisatel.service;

import com.nisatel.model.OfferedService;
import com.nisatel.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository repo;

    public ServiceService(ServiceRepository repo) {
        this.repo = repo;
    }

    public OfferedService save(OfferedService service) {
        return repo.save(service);
    }

    public List<OfferedService> getAll() {
        return repo.findAllByOrderByOrderIndexAsc();
    }

    public OfferedService getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
