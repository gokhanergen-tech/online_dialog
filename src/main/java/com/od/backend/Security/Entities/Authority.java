package com.od.backend.Security.Entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "authorities",schema = "auth")
@Getter
@Setter
@RequiredArgsConstructor
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "authority",nullable = false,unique = true)
    private String authority;

    public Authority(String authority) {
        this.authority = authority;
    }
}
