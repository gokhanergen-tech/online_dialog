package com.od.backend.Security.Service;

import com.od.backend.Security.Entities.LoginCredentials;
import com.od.backend.Security.Repositories.LoginCredentialsRepository;
import com.od.backend.Usecases.Api.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsService implements UserDetailsManager {

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private LoginCredentialsRepository loginCredentialsRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public void createUser(UserDetails user) {
            ((LoginCredentials)user).setPassword(passwordEncoder.encode(user.getPassword()));
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

    }

    @Override
    public boolean userExists(String email) {
        Optional<LoginCredentials> loginCredentialsOptional=loginCredentialsRepository.findByEmail(email);
        return loginCredentialsOptional.orElse(null)!=null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return loginCredentialsRepository.findByEmail(email).orElseThrow();
    }
}
