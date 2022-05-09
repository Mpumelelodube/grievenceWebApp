package com.grievency.grievencewebapp.controller;

import com.grievency.grievencewebapp.model.LoginAdmin;
import com.grievency.grievencewebapp.model.UserAdmin;
import com.grievency.grievencewebapp.service.UserAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/user-admin")
public class AdminController {
    public final UserAdminService userAdminService;

    @Autowired
    public AdminController(UserAdminService userAdminService) {
        this.userAdminService = userAdminService;
    }

    @GetMapping("/get-all-users")
    public List<UserAdmin> getAllUsers(){
        return userAdminService.getAll();
    }

    @PostMapping("save-user")
    public UserAdmin saveUser(@RequestBody UserAdmin userAdmin){
        return userAdminService.save(userAdmin);
    }

    @GetMapping("/get-specific-user/{id}")
    public UserAdmin getSpecificUser(@PathVariable Long id){
        return userAdminService.getUser(id);
    }

    @PostMapping("/login")
    public LoginAdmin login(@RequestBody UserAdmin userAdmin){
        UserAdmin user;
        try {
            user = userAdminService.findByEmail(userAdmin.getEmail());
            if (user.getPassword().equals(userAdmin.getPassword())){
                return new LoginAdmin(user, "success");
            }else {
                return new LoginAdmin(userAdmin, "fail");
            }
        }catch (NullPointerException e){
            return new LoginAdmin(userAdmin, "500");
        }
    }

    public UserAdmin getUser(String email){
        return userAdminService.findByEmail(email);
    }
}
