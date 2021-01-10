package com.project.myFinances.services;

import com.project.myFinances.models.entities.User;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.Payment;
import com.project.myFinances.models.enums.StatusPayment;
import com.project.myFinances.models.enums.TypePayment;
import com.project.myFinances.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Component
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    @Transactional
    public Payment save(Payment payment) {
        validate(payment);
        payment.setStatus(StatusPayment.PENDING);
        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment update(Payment payment) {
        validate(payment);
        return paymentRepository.save(payment);
    }

    public void updateStatus(Payment payment, StatusPayment statusPayment) {
        payment.setStatus(statusPayment);
        update(payment);
    }

    @Transactional
    public void delete(Payment payment) {
        Objects.requireNonNull(payment.getId());
        paymentRepository.delete(payment);
    }

    public Payment findById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Payment not found"));
    }

    @Transactional
    public List<Payment> searchBy(User user, String description, Integer month, Integer year, TypePayment type, StatusPayment status) {
        Payment payment = fillFields(user,description,month,year,type,status);
        Example example = Example.of(payment, ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING));
        return paymentRepository.findAll(example);
    }

    public void validate(Payment payment) {
        if (payment.getDescription() == null || payment.getDescription().trim().equals("")) {
            throw new BusinessRuleException("Incorrect description field");
        }
        if (payment.getMonth() == null || payment.getMonth() < 1 || payment.getMonth() > 12) {
            throw new BusinessRuleException("Incorrect month field");
        }
        if (payment.getYear() == null || payment.getYear().toString().length() != 4) {
            throw new BusinessRuleException("Incorrect year field");
        }
        if (payment.getUser() == null || payment.getUser().getId() == null) {
            throw new BusinessRuleException("User field is required");
        }
        if (payment.getValue() == null || payment.getValue().compareTo(BigDecimal.ZERO) < 1) {
            throw new BusinessRuleException("Incorrect value field");
        }
        if (payment.getType() == null) {
            throw new BusinessRuleException("Incorrect type field");
        }
    }

    public Payment fillFields(User user, String description, Integer month, Integer year, TypePayment type, StatusPayment status) {
        Payment payment = new Payment();

        payment.setUser(user);
        payment.setDescription(description);
        payment.setMonth(month);
        payment.setYear(year);
        payment.setType(type);
        payment.setStatus(status);

        return payment;
    }
}
