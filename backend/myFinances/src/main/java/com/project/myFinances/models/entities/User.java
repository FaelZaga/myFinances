package com.project.myFinances.models.entities;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(schema = "finances")
@Data
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

}
