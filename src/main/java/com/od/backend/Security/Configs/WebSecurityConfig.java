package com.od.backend.Security.Configs;

import com.od.backend.Security.Service.UserDetailsService;
import com.od.backend.Security.Util.JWTRequestFilter;
import com.od.backend.Security.Util.LoginRequestFilter;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

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
                  .antMatchers("/api/delete").hasAuthority("ADMIN_ROLE")
                  .antMatchers("/api/rooms").hasAuthority("USER_ROLE")
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin().disable()
                .logout(logout->logout.logoutUrl("/api/logout")
                        .addLogoutHandler(new LogoutHandler() {
                            @Override
                            public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

                            }
                        })
                   .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                   .clearAuthentication(true)
                   .invalidateHttpSession(true)
                   .deleteCookies("accessToken","refreshToken"))
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

        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000","http://127.0.0.1:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET","POST","DELETE","PUT"));
        corsConfiguration.setAllowedHeaders(List.of("Content-Type","Origin","Accept"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource=new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }


}
