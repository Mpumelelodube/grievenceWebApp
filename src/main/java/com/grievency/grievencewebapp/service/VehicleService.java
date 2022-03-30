package com.grievency.grievencewebapp.service;

import com.grievency.grievencewebapp.model.Vehicle;
import com.grievency.grievencewebapp.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class VehicleService {
    VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle save(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
        return vehicleRepository.findById(vehicle.getId()).orElseThrow(() -> new  IllegalStateException ("vehicle does not exist"));
    }

    public List<Vehicle> getAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicle(Long id) {
        return vehicleRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("vehicle does not exist"));
    }

    @Transactional
    public Vehicle update(long id, Vehicle update) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("vehicle does not exist"));

        return null;
    }
}
