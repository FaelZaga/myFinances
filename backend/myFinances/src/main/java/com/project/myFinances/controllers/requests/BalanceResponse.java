package com.project.myFinances.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BalanceResponse {
    private String name;
    private BigDecimal balance;
    private BigDecimal incomes;
    private BigDecimal expenses;
}
