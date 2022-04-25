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
    private final GrievanceUserController grievanceUserController;

    @Autowired
    public GrieveController(GrieveService grieveService, GrievanceUserController grievanceUserController) {
        this.grieveService = grieveService;
        this.grievanceUserController = grievanceUserController;
    }

    @PostMapping("/save-grievance")
    public Grieve saveGrieve(@RequestBody Grieve grieve){
        return grieveService.save(grieve);
    }

    @GetMapping("/find-by-email/{email}")
    public List<Grieve> getUserGrievances(@PathVariable String email){
        return grieveService.findByEmail(email);
    }

    @GetMapping("/get-all-grievances")
    public List<Grieve> getAllGrievances(){
        List<Grieve> grieves = grieveService.getAll();

        for (int i = 0; i < grieves.size(); i++){
            grieves.get(i).setGrievanceUser(grievanceUserController.getUser(grieves.get(i).getEmail()));
        }
        return grieves;
    }

    @PutMapping("/update-grievance/{id}")
    public Grieve updateGrieve(@RequestBody Grieve grieve, @PathVariable Long id){
        return grieveService.update(grieve, id);
    }
}
