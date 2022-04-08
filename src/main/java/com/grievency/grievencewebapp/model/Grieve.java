package com.grievency.grievencewebapp.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Grieve {
    @Id
    @SequenceGenerator(
            name = "grieve_sequence",
            sequenceName = "grieve_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "grieve_sequence"
    )
    private Long id;
    private String email;
    private LocalDate date = LocalDate.now();
    private String cartegories;
    private String additionalInfomation;
    private String licencePlate;
    private int status;
    @Transient
    private GrievanceUser grievanceUser;

    public Grieve(String email, String date, String cartegories, String additionalInfomation, String licencePlate, int status) {
        this.email = email;
        this.cartegories = cartegories;
        this.additionalInfomation = additionalInfomation;
        this.licencePlate = licencePlate;
        this.status = status;
    }
}
