package com.nisatel.repository;

import com.nisatel.model.OfferedService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<OfferedService, Long> {
    List<OfferedService> findAllByOrderByOrderIndexAsc();
}

