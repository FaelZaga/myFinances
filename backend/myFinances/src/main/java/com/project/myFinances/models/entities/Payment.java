package com.project.myFinances.models.entities;

import com.project.myFinances.models.enums.StatusPayment;
import com.project.myFinances.models.enums.TypePayment;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(schema = "finances")
@Data
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Integer month;
    private Integer year;
    private BigDecimal value;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @Column(name = "created_at")
    @Convert(converter = Jsr310JpaConverters.LocalDateConverter.class)
    private LocalDate createdAt;

    @Enumerated(value = EnumType.STRING)
    private TypePayment type;

    @Enumerated(value = EnumType.STRING)
    private StatusPayment status;
}
