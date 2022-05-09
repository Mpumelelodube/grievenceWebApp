package com.grievency.grievencewebapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class LoginAdmin {
    private UserAdmin grievanceUser;
    private String status;

}
