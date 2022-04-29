package com.od.backend.Security.Service;

import com.od.backend.Security.Entities.Authority;
import com.od.backend.Security.Entities.LoginCredential;
import com.od.backend.Security.Repositories.AuthorityRepository;
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

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsService implements UserDetailsManager {
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private LoginCredentialsRepository loginCredentialsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    @Value("${jwt.security.password_pepper}")
    private String pepper;

    @Transactional
    @Override
    public void createUser(UserDetails user) {
            LoginCredential loginCredential=((LoginCredential)user);
            loginCredential.setPassword(passwordEncoder.encode(user.getPassword()+pepper));
            Set<Authority> authorities=loginCredential.getAuthorities();
            loginCredential.setAuthorities(authorities.stream()
                    .map(authority->authorityRepository.findByAuthority(authority.getAuthority()).orElse(null))
                    .filter(authority->authority.getAuthority()!=null)
                    .collect(Collectors.toSet()));
            loginCredentialsRepository.save(loginCredential);
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
            String encodedNewPassword=passwordEncoder.encode(newPassword+pepper);
            LoginCredential loginCredential =(LoginCredential) userDetails;
            loginCredential.setPassword(encodedNewPassword);
            loginCredentialsRepository.save(loginCredential);

            authentication=new UsernamePasswordAuthenticationToken(email,encodedNewPassword);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    @Override
    public boolean userExists(String email) {
        Optional<LoginCredential> loginCredentialsOptional=loginCredentialsRepository.findByEmail(email);
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
