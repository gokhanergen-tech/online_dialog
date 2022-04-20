package com.od.backend.Security.Configs;

import com.od.backend.Security.Util.CustomBCryptPasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new CustomBCryptPasswordEncoder(10);
    }


}
