package com.grievency.grievencewebapp.service;

import com.grievency.grievencewebapp.model.Grieve;
import com.grievency.grievencewebapp.repository.GrieveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrieveService {
    private final GrieveRepository grieveRepository;

    @Autowired
    public GrieveService(GrieveRepository grieveRepository) {
        this.grieveRepository = grieveRepository;
    }

    public Grieve save(Grieve grieve) {
        grieveRepository.save(grieve);
        return grieveRepository.findById(grieve.getId()).orElseThrow(() -> new  IllegalStateException ("Grieve does not exist"));
    }

    public List<Grieve> findByEmail(String email) {
        return grieveRepository.findByEmail(email);
    }

    public List<Grieve> getAll() {
        return grieveRepository.findAll();
    }
}
