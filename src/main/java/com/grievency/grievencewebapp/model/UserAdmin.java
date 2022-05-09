package com.grievency.grievencewebapp.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class UserAdmin {
    @Id
    @SequenceGenerator(
            name = "userAdmin_sequence",
            sequenceName = "userAdmin_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userAdmin_sequence"
    )
    private Long id;
    private String firstNane;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private int accessLevel;

    public UserAdmin(String firstNane, String lastName, String email, String password, String phone, int accessLevel) {
        this.firstNane = firstNane;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.accessLevel = accessLevel;
    }
}
