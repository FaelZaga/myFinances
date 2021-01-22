package com.project.myFinances.services;

import com.project.myFinances.models.entities.UserEntity;
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
        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment update(Payment payment) {
        Objects.requireNonNull(payment.getId());
        validate(payment);
        return paymentRepository.save(payment);
    }

    @Transactional
    public void delete(Payment payment) {
        Objects.requireNonNull(payment.getId());
        paymentRepository.delete(payment);
    }

    @Transactional
    public List<Payment> searchBy(UserEntity user, String description, Integer month, Integer year, TypePayment type, StatusPayment status) {
        Payment payment = fillFields(user,description,month,year,type,status);
        Example example = Example.of(payment, ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING));
        return paymentRepository.findAll(example);
    }

    @Transactional(readOnly = true)
    public BigDecimal getPaymentBalanceByType(Long id) {
        BigDecimal incomes = paymentRepository.getPaymentBalanceByType(id,TypePayment.INCOME);
        BigDecimal expenses = paymentRepository.getPaymentBalanceByType(id,TypePayment.EXPENSES);

        if (incomes == null) {
            incomes = BigDecimal.ZERO;
        }
        if (expenses == null) {
            expenses = BigDecimal.ZERO;
        }

        return incomes.subtract(expenses);
    }

    public Payment findById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("Payment not found"));
    }

    public void validate(Payment payment) {
        if (payment.getUser() == null || payment.getUser().getId() == null) {
            throw new BusinessRuleException("User field is required");
        }
        if (payment.getDescription() == null || payment.getDescription().trim().equals("")) {
            throw new BusinessRuleException("Incorrect description field");
        }
        if (payment.getMonth() == null || payment.getMonth() < 1 || payment.getMonth() > 12) {
            throw new BusinessRuleException("Incorrect month field");
        }
        if (payment.getYear() == null || payment.getYear().toString().length() != 4) {
            throw new BusinessRuleException("Incorrect year field");
        }
        if (payment.getValue() == null || payment.getValue().compareTo(BigDecimal.ZERO) < 1) {
            throw new BusinessRuleException("Incorrect value field");
        }
        if (payment.getType() == null) {
            throw new BusinessRuleException("Incorrect type field");
        }
        if (payment.getStatus() == null) {
            throw new BusinessRuleException("Incorrect status field");
        }
    }

    public Payment fillFields(UserEntity user, String description, Integer month, Integer year, TypePayment type, StatusPayment status) {
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
