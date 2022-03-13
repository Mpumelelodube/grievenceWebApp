package com.grievency.grievencewebapp.controller;

import com.grievency.grievencewebapp.model.Grieve;
import com.grievency.grievencewebapp.service.GrieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/grieve")
public class GrieveController {
    private final GrieveService grieveService;

    @Autowired
    public GrieveController(GrieveService grieveService) {
        this.grieveService = grieveService;
    }

    @PostMapping("/save-grievance")
    public Grieve saveGrieve(@RequestBody Grieve grieve){
        return grieveService.save(grieve);
    }

    @GetMapping("/find-by-email/{email}")
    public List<Grieve> getUserGrievances(@PathVariable String email){
        return grieveService.findByEmail(email);
    }
}
