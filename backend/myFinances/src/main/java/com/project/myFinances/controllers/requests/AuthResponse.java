package com.project.myFinances.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private Long id;
    private String name;
    private String email;
    private String token;
}
