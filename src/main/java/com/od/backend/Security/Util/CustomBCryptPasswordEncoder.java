package com.od.backend.Security.Util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CustomBCryptPasswordEncoder extends BCryptPasswordEncoder {

    private final Log logger=LogFactory.getLog(getClass());

    @Value("${jwt.security.password_salt}")
    private String salt;

    public CustomBCryptPasswordEncoder(int strength) {
        super(strength);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
       return super.matches(rawPassword+salt,encodedPassword);
    }
}
