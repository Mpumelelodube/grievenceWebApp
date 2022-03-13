package com.grievency.grievencewebapp.repository;

import com.grievency.grievencewebapp.model.GrievanceUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrievanceUserRepository extends JpaRepository<GrievanceUser, Long> {
    GrievanceUser findByEmail(String email);
}
