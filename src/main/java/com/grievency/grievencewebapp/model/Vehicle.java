package com.grievency.grievencewebapp.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Vehicle {
    @Id
    @SequenceGenerator(
            name = "vehicle_sequence",
            sequenceName = "vehicle_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vehicle_sequence"
    )
    private Long id;
    private String licencePlate;
    private String route;
    private  String driver;
    private String conductor;
    private String contact;
    private String vehicleType;
    private LocalDateTime date = LocalDateTime.now();

    public Vehicle(String licencePlate, String route, String driver, String conductor, String contact) {
        this.licencePlate = licencePlate;
        this.route = route;
        this.driver = driver;
        this.conductor = conductor;
        this.contact = contact;
    }
}
