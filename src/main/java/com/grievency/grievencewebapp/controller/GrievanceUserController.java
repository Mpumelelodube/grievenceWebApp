package com.grievency.grievencewebapp.controller;

import com.grievency.grievencewebapp.model.GrievanceUser;
import com.grievency.grievencewebapp.model.Login;
import com.grievency.grievencewebapp.service.GrievanceUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/user")
public class GrievanceUserController {
    public final GrievanceUserService grievanceUserService;

    @Autowired
    public GrievanceUserController(GrievanceUserService grievanceUserService) {
        this.grievanceUserService = grievanceUserService;
    }

    @GetMapping("/get-all-users")
    public List<GrievanceUser> getAllUsers(){
        return grievanceUserService.getAll();
    }

    @PostMapping("save-user")
    public GrievanceUser saveUser(@RequestBody GrievanceUser grievanceUser){
        return grievanceUserService.save(grievanceUser);
    }

    @GetMapping("/get-specific-user/{id}")
    public GrievanceUser getSpecificUser(@PathVariable Long id){
        return grievanceUserService.getUser(id);
    }

    @PostMapping("/login")
    public Login login(@RequestBody GrievanceUser grievanceUser){
        GrievanceUser user;
        try {
            user = grievanceUserService.findByEmail(grievanceUser.getEmail());
            if (user.getPassword().equals(grievanceUser.getPassword())){
                return new Login(user, "success");
            }else {
                return new Login(grievanceUser, "fail");
            }
        }catch (NullPointerException e){
            return new Login(grievanceUser, "500");
        }
    }

    public GrievanceUser getUser(String email){
        return grievanceUserService.findByEmail(email);
    }
}
