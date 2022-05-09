package com.grievency.grievencewebapp.repository;

import com.grievency.grievencewebapp.model.UserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAdminRepository extends JpaRepository<UserAdmin, Long> {
    UserAdmin findByEmail(String email);
}
