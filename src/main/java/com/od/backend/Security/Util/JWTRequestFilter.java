package com.od.backend.Security.Util;

import com.od.backend.Security.Service.CookieService;
import com.od.backend.Security.Service.JWTService;
import com.od.backend.Security.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
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
            String email=null;
            response.setContentType("application/json;");

            try {
                if(accessToken==null){
                    throw new Exception();
                }
                String accessTokenGet=accessToken.getValue();
                email = jwtService.extractMail(accessSecretKey, accessTokenGet);
            }catch (Exception exception) {
                response.setStatus(401);
                response.getWriter().write("{\"message\":\"You are not permitted!\"}");
                return;
            }

            //Save the user for Authentication
            try{
                AuthenticateProcesses.authenticate(userDetailsService,request,email);
            }catch (UsernameNotFoundException usernameNotFoundException) {
                response.setStatus(404);
                response.getWriter().write("{\"message\":\"There is no such user!\"}");
                return;
            }catch (Exception e){
                response.setStatus(500);
                response.getWriter().write("{\"message\":\"There is no such user!\"}");
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
