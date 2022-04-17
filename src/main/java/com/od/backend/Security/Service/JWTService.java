package com.od.backend.Security.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Service
public class JWTService {

    public String generateToken(String secretKey, Integer expirationDay, Authentication authentication){
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities",getAuthorities(authentication.getAuthorities()))
                .setIssuedAt(new Date()).setExpiration(Date.from(LocalDate.now().plusDays(expirationDay).atStartOfDay(TimeZone.getDefault().toZoneId()).toInstant()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    private List<String> getAuthorities(Collection<? extends GrantedAuthority> authorities){
        return authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
    }

    public String extractMail(String secretKey,String token){
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

}
