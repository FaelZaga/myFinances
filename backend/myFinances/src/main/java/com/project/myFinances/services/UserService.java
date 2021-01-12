package com.project.myFinances.services;

import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.exceptions.BusinessRuleException;
import com.project.myFinances.models.entities.User;
import com.project.myFinances.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
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
        validate(user);
        return userRepository.save(user);
    }

    @Transactional
    public void delete(User user) {
        Objects.requireNonNull(user.getId());
        userRepository.delete(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException("User not found"));
    }

    public void validateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new BusinessRuleException("Email already exists.");
        }
    }

    public void validate(User user) {
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
}
