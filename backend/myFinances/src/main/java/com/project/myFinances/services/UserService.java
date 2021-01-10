package com.project.myFinances.services;

import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.User;
import com.project.myFinances.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            throw new AuthError("User does not exist");
        }

        if (!user.get().getPassword().equals(password)) {
            throw new AuthError("Incorrect password");
        }

        return user.get();
    }

    @Transactional
    public User save(User user) {
        validateEmail(user.getEmail());
        return userRepository.save(user);
    }

    public void validateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new BusinessRuleException("Email already exists.");
        }
    }
}
