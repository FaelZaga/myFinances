package com.project.myFinances.repositories;

import com.project.myFinances.models.entities.Payment;
import com.project.myFinances.models.enums.TypePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query(value = "select sum(p.value) from Payment p " +
            "join p.user u where u.id =:userId and p.type =:type group by u")
    BigDecimal getPaymentBalanceByType(@Param("userId") Long id, @Param("type") TypePayment type);
}
