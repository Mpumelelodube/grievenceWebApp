package com.grievency.grievencewebapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Login {
    private GrievanceUser grievanceUser;
    private String status;

}
