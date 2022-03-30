package com.grievency.grievencewebapp.repository;

import com.grievency.grievencewebapp.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
