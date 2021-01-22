package com.project.myFinances.services;

import com.project.myFinances.controllers.requests.AuthResponse;
import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.UserEntity;
import com.project.myFinances.repositories.UserRepository;
import com.project.myFinances.security.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    public AuthResponse authenticate(String email, String password) {
        Optional<UserEntity> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            throw new AuthError("User does not exist");
        }

        if (!passwordEncoder.matches(password,user.get().getPassword())) {
            throw new AuthError("Incorrect password");
        }

        String token = jwtService.generateToken(user.get());
        AuthResponse userToken = new AuthResponse(
                user.get().getId(),
                user.get().getName(),
                user.get().getEmail(),
                token);

        return userToken;
    }

    @Transactional
    public UserEntity save(UserEntity user) {
        validate(user);
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }

    @Transactional
    public void delete(UserEntity user) {
        Objects.requireNonNull(user.getId());
        userRepository.delete(user);
    }

    public UserEntity findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("User not found"));
    }

    public void validateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new BusinessRuleException("Email already exists.");
        }
    }

    public void validate(UserEntity user) {
        validateEmail(user.getEmail());
        if (user.getName() == null || user.getName().length() < 3) {
            throw new BusinessRuleException("Name is required with 3 characters minimum");
        }
        if (user.getEmail() == null || !user.getEmail().contains("@")) {
            throw new BusinessRuleException("Incorrect email field");
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new BusinessRuleException("Incorrect password field");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthError("User does not exist"));

        return User
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
