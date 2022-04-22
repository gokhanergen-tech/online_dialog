package com.od.backend.Security.Util;

import com.od.backend.Security.Entities.LoginCredential;
import com.od.backend.Security.Service.UserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.http.HttpServletRequest;

abstract class AuthenticateProcesses {
    
    public static void authenticate(UserDetailsService userDetailsService, HttpServletRequest request, String email) {
            LoginCredential loginCredential =(LoginCredential) userDetailsService.loadUserByUsername(email);
            var tokenAuth=new UsernamePasswordAuthenticationToken(loginCredential.getUsername(),null, loginCredential.getAuthorities());
            tokenAuth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(tokenAuth);
    }
    
}
