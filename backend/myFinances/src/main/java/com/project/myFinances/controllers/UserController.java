package com.project.myFinances.controllers;

import com.project.myFinances.controllers.requests.AuthRequest;
import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.User;
import com.project.myFinances.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth")
    public ResponseEntity authenticate(@RequestBody AuthRequest user) {
        try {
            return ResponseEntity.ok(userService.authenticate(user.getEmail(),user.getPassword()));
        }catch(AuthError e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody User user) {
        try {
            return new ResponseEntity(userService.createUser(user), HttpStatus.CREATED);
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
