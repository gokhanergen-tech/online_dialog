package com.od.backend.Security.Entities;


import com.od.backend.Usecases.Api.Entities.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "logins_credentials",schema = "auth")
@Getter
@Setter
@RequiredArgsConstructor
public class LoginCredentials implements UserDetails, CredentialsContainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //mail reqex control yapılacak
    @Column(name = "email",nullable = false,unique = true)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
    @JoinColumn(name = "pk_user_id",referencedColumnName = "id",nullable = false,updatable = false)
    private User user;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "user_authorities"
    ,joinColumns = @JoinColumn(name = "login_id")
    ,inverseJoinColumns = @JoinColumn(name = "authority_id")
    ,schema = "auth")
    private Set<Authority> authorities;


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {
         password=null;
    }
}
