package com.od.backend;

import com.od.backend.Security.Entities.Authority;
import com.od.backend.Security.Repositories.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.util.List;


@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories
public class main {

    @Autowired
    private AuthorityRepository authorityRepository;
    //This is runnable for that if auth_create is create
    /*@PostConstruct
    public void addAuthorities(){
        authorityRepository.saveAll(List.of(new Authority("USER_ROLE"),new Authority("OWNER_ROLE"),new Authority("ADMIN_ROLE")));
    }*/

    public static void main(String args[]){
        SpringApplication.run(main.class,args);
    }

}
