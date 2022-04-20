package com.od.backend.Security.Entities;

import com.od.backend.BaseEntities.Base;
import com.od.backend.Usecases.Api.Entities.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "refresh_tokens",schema = "auth")
public class RefreshToken extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "refresh_token",nullable = false,columnDefinition = "VARCHAR")
    private String refreshToken;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable = false,referencedColumnName = "id",unique = true)
    private User user;

}
