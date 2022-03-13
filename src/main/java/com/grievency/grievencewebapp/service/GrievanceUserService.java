package com.grievency.grievencewebapp.service;

import com.grievency.grievencewebapp.model.GrievanceUser;
import com.grievency.grievencewebapp.repository.GrievanceUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrievanceUserService {
    private final GrievanceUserRepository grievanceUserRepository;

    @Autowired
    public GrievanceUserService(GrievanceUserRepository grievanceUserRepository) {
        this.grievanceUserRepository = grievanceUserRepository;
    }

    public List<GrievanceUser> getAll(){
        return grievanceUserRepository.findAll();
    }

    public GrievanceUser getUser(Long id){
        return grievanceUserRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Contact details with id: " + id +" does not exist"));
    }

    public GrievanceUser save(GrievanceUser grievanceUser) {
        grievanceUserRepository.save(grievanceUser);
        return grievanceUserRepository.findById(grievanceUser.getId()).orElseThrow(() -> new  IllegalStateException ("user does not exist"));
    }

    public GrievanceUser findByEmail(String email){
        return grievanceUserRepository.findByEmail(email);
    }
}
