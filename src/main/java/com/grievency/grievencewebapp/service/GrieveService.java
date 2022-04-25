package com.grievency.grievencewebapp.service;

import com.grievency.grievencewebapp.model.Grieve;
import com.grievency.grievencewebapp.repository.GrieveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

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

    @Transactional
    public Grieve update(Grieve update, Long id) {
        Grieve grieve = grieveRepository.findById(id).orElseThrow(() -> new  IllegalStateException ("Grieve does not exist"));

        if (update.getStatus() > grieve.getStatus() && !Objects.equals(grieve.getStatus(), update.getStatus())){
            grieve.setStatus(update.getStatus());
        }
        return grieve;
    }
}
