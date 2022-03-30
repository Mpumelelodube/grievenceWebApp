package com.grievency.grievencewebapp.controller;

import com.grievency.grievencewebapp.model.Vehicle;
import com.grievency.grievencewebapp.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/vehicle")
public class VehicleController {
    VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/save")
    public Vehicle saveVehicle(@RequestBody Vehicle vehicle){
        return vehicleService.save(vehicle);
    }

    @GetMapping("/get-all-vehicles")
    public List<Vehicle> getAllVehicles(){
        return vehicleService.getAll();
    }

    @GetMapping("/get-specific-vehicle/{id}")
    public Vehicle getVehicle(@PathVariable Long id){
        return vehicleService.getVehicle(id);
    }

    @PutMapping("/update/{id}")
    public Vehicle updateVehicle(@PathVariable long id, @RequestBody Vehicle vehicle){
        return vehicleService.update(id, vehicle);
    }
}
