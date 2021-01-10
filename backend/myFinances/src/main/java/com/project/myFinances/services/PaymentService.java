package com.project.myFinances.services;

import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.Payment;
import com.project.myFinances.models.enums.StatusPayment;
import com.project.myFinances.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        Objects.requireNonNull(payment.getId());
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

    @Transactional
    public List<Payment> search(Payment payment) {
        return null;
    }

    public void validate(Payment payment) {
        if (payment.getDescription() == null || payment.getDescription().trim().equals("")) {
            throw new BusinessRuleException("Description field is required");
        }
        if (payment.getMonth() == null || payment.getMonth() < 1 || payment.getMonth() > 12) {
            throw new BusinessRuleException("Month field is required");
        }
        if (payment.getYear() == null || payment.getYear().toString().length() != 4) {
            throw new BusinessRuleException("Year field is required");
        }
        if (payment.getUser() == null || payment.getUser().getId() == null) {
            throw new BusinessRuleException("User field is required");
        }
        if (payment.getValue() == null || payment.getValue().compareTo(BigDecimal.ZERO) < 1) {
            throw new BusinessRuleException("Value field is required");
        }
        if (payment.getType() == null) {
            throw new BusinessRuleException("Type field is required");
        }
    }
}
