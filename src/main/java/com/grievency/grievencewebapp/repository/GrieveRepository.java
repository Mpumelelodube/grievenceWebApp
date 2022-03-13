package com.grievency.grievencewebapp.repository;

import com.grievency.grievencewebapp.model.Grieve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrieveRepository extends JpaRepository<Grieve, Long> {
    List<Grieve> findByEmail(String email);
}
