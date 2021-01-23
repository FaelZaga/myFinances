package com.project.myFinances.repositories;

import com.project.myFinances.models.entities.Payment;
import com.project.myFinances.models.enums.StatusPayment;
import com.project.myFinances.models.enums.TypePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query(value = "select sum(p.value) from Payment p " +
            "join p.user u where u.id =:userId and p.type =:type and not p.status =:status group by u")
    BigDecimal getPaymentBalanceByType(@Param("userId") Long id,
                                       @Param("type") TypePayment type,
                                       @Param("status") StatusPayment status);

    @Query(value = "select sum(p.value) from Payment p " +
            "join p.user u where u.id =:userId and p.type =:type and not p.status =:status " +
            "and p.month =:month and p.year =:year group by u")
    BigDecimal getBalanceByMonthAndYear(@Param("userId") Long id,
                                        @Param("type") TypePayment type,
                                        @Param("status") StatusPayment status,
                                        @Param("month") Integer month,
                                        @Param("year") Integer year);
}
