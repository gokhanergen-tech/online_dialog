package com.od.backend.Security.Entities;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LoginRequest {

    private String email;
    private String password;

}
