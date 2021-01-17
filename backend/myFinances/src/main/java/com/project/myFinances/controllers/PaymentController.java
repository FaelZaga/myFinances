package com.project.myFinances.controllers;

import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.Payment;
import com.project.myFinances.models.entities.User;
import com.project.myFinances.models.enums.StatusPayment;
import com.project.myFinances.models.enums.TypePayment;
import com.project.myFinances.services.PaymentService;
import com.project.myFinances.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity save(@RequestBody Payment payment) {
        try {
            userService.findById(payment.getUser().getId());
            return new ResponseEntity(paymentService.save(payment), HttpStatus.CREATED);
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Payment payment) {
        try {
            paymentService.findById(id);
            payment.setId(id);
            return ResponseEntity.ok(paymentService.update(payment));
        }catch (BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(paymentService.findById(id));
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity searchBy(
            @RequestParam(value = "user") Long id,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "month", required = false) Integer month,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "type", required = false) TypePayment type,
            @RequestParam(value = "status", required = false) StatusPayment status) {
        try {
            User user = userService.findById(id);
            return ResponseEntity.ok(paymentService.searchBy(user,description,month,year,type,status));
        }catch(BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            Payment payment = paymentService.findById(id);
            paymentService.delete(payment);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch (BusinessRuleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
