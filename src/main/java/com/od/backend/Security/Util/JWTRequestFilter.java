package com.od.backend.Security.Util;

import com.od.backend.Security.Service.CookieService;
import com.od.backend.Security.Service.JWTService;
import com.od.backend.Security.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private CookieService cookieService;

    @Value("${jwt.security.secret_key_accessToken}")
    private String accessSecretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getCookies()!=null){

                Optional<Cookie> accessTokenCookie=cookieService.searchCookie(Arrays.stream(request.getCookies()),"accessToken");
                Cookie accessToken=accessTokenCookie.orElse(null);

                try{
                    if(accessToken==null){
                        throw new NullPointerException();
                    }else{
                        String accessTokenGet=accessToken.getValue();

                        String email=jwtService.extractMail(accessSecretKey,accessTokenGet);
                        //Save the user for Authentication
                        AuthenticateProcesses.authenticate(userDetailsService,request,email);
                    }
                }catch (Exception e){
                    response.setStatus(401);
                    response.setContentType("application/json;");
                    response.getWriter().write("{\"message\":\"This request is not permitted\"}");
                    return;
                }

        }

        filterChain.doFilter(request,response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().equals("/api/login")||request.getRequestURI().equals("/api/register");
    }
}
