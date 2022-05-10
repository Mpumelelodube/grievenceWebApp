package com.grievency.grievencewebapp.service;

import com.grievency.grievencewebapp.model.GrievanceUser;
import com.grievency.grievencewebapp.model.UserAdmin;
import com.grievency.grievencewebapp.repository.GrievanceUserRepository;
import com.grievency.grievencewebapp.repository.UserAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class UserAdminService {
    private final UserAdminRepository userAdminRepository;

    @Autowired
    public UserAdminService(UserAdminRepository userAdminRepository) {
        this.userAdminRepository = userAdminRepository;
    }

    public List<UserAdmin> getAll(){
        return userAdminRepository.findAll();
    }

    public UserAdmin getUser(Long id){
        return userAdminRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Contact details with id: " + id +" does not exist"));
    }

    public UserAdmin save(UserAdmin userAdmin) {
        if (userAdminRepository.findAll().size() == 0){
            userAdmin.setAccessLevel(0);
        }else {
            userAdmin.setAccessLevel(5);
        }
        System.out.println(userAdmin);
        userAdminRepository.save(userAdmin);
        return userAdminRepository.findById(userAdmin.getId()).orElseThrow(() -> new  IllegalStateException ("user does not exist"));
    }

    public UserAdmin findByEmail(String email){
        return userAdminRepository.findByEmail(email);
    }

    @Transactional
    public UserAdmin updateUser(UserAdmin update, Long id) {
        UserAdmin userAdmin = userAdminRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("user does not exist"));

        if (!Objects.equals(userAdmin.getAccessLevel(), update.getAccessLevel())){
            userAdmin.setAccessLevel(update.getAccessLevel());
        }

        return userAdmin;
    }
}
