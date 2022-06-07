package com.od.backend.Security.Configs;

import com.od.backend.Security.Service.CookieService;
import com.od.backend.Security.Service.RefreshTokenService;
import com.od.backend.Security.Service.UserDetailsService;
import com.od.backend.Security.Util.JWTRequestFilter;
import com.od.backend.Security.Util.LoginRequestFilter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private CookieService cookieService;

    @Autowired
    private JWTRequestFilter jwtRequestFilter;
    @Autowired
    private LoginRequestFilter loginRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(getAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                  .antMatchers("/api/login").permitAll().and().addFilterBefore(loginRequestFilter,UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                  .antMatchers("/api/register").permitAll()
                  .antMatchers("/api/auth/control").permitAll()
                  .antMatchers("/api/delete","/api/owner/rooms").hasAuthority("ADMIN_ROLE")
                  .antMatchers("/api/user/rooms","/api/validate").hasAuthority("USER_ROLE")
                  .antMatchers(HttpMethod.POST,"/api/room").hasAuthority("ADMIN_ROLE")
                .antMatchers("/api/logout").hasAnyAuthority("ADMIN_ROLE","USER_ROLE")
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .logout().disable()
                .formLogin().disable()
                .httpBasic().disable();
    }

    @Bean
    public DaoAuthenticationProvider getAuthenticationProvider(){
         DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
         daoAuthenticationProvider.setUserDetailsService(userDetailsService);
         daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
         return daoAuthenticationProvider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration=new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);

        corsConfiguration.setAllowedOrigins(List.of("http://192.168.196.58:3000","http://localhost:3000","http://127.0.0.1:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET","POST","DELETE","PUT"));
        corsConfiguration.setAllowedHeaders(List.of("Content-Type","Origin","Accept"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource=new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }


}
