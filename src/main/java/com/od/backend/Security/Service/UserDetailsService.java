package com.od.backend.Security.Service;

import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Security.Repositories.LoginCredentialsRepository;
import com.od.backend.Usecases.Api.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class UserDetailsService implements UserDetailsManager {
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private LoginCredentialsRepository loginCredentialsRepository;
    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.security.password_salt}")
    private String salt;

    @Override
    public void createUser(UserDetails user) {
            ((LoginCredentials)user).setPassword(passwordEncoder.encode(user.getPassword()+salt));
            loginCredentialsRepository.save((LoginCredentials) user);
    }

    @Override
    public void updateUser(UserDetails user) {

    }

    @Override
    public void deleteUser(String email) throws UsernameNotFoundException {
        if(userExists(email)){
            loginCredentialsRepository.deleteByEmail(email);
        }else{
            throw new UsernameNotFoundException("Böyle bir kullanıcı yok!");
        }
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();

        if(authentication.isAuthenticated()){
            String email=authentication.getName();
            UserDetails userDetails=loadUserByUsername(email);
            String encodedNewPassword=passwordEncoder.encode(newPassword+salt);
            LoginCredentials loginCredentials=(LoginCredentials) userDetails;
            loginCredentials.setPassword(encodedNewPassword);
            loginCredentialsRepository.save(loginCredentials);

            authentication=new UsernamePasswordAuthenticationToken(email,encodedNewPassword);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    @Override
    public boolean userExists(String email) {
        Optional<LoginCredentials> loginCredentialsOptional=loginCredentialsRepository.findByEmail(email);
        return loginCredentialsOptional.orElse(null)!=null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails userDetails=loginCredentialsRepository.findByEmail(email).orElse(null);
        if(userDetails==null){
            throw new UsernameNotFoundException("There is not such a user");
        }
        return userDetails;
    }

}
