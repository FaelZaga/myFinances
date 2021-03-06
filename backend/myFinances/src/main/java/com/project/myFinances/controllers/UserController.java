package com.project.myFinances.controllers;

import com.project.myFinances.controllers.requests.AuthRequest;
import com.project.myFinances.controllers.requests.TokenRequest;
import com.project.myFinances.controllers.requests.UserUpdateRequest;
import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.UserEntity;
import com.project.myFinances.services.PaymentService;
import com.project.myFinances.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        }catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity save(@RequestBody UserEntity user) {
        try {
            return new ResponseEntity(userService.save(user), HttpStatus.CREATED);
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable Long id,
                                 @RequestBody UserUpdateRequest user,
                                 @RequestHeader("Authorization") String token) {
        try {
            return ResponseEntity.ok(userService.update(id,user,token));
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/validateToken")
    public ResponseEntity validateToken(@RequestBody TokenRequest token) {
        TokenRequest isValid = new TokenRequest(token.getToken(),userService.validateToken(token.getToken()));
        return new ResponseEntity(isValid, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            UserEntity user = userService.findById(id);
            userService.delete(user);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch (BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
