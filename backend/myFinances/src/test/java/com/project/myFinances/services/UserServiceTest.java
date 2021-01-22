package com.project.myFinances.services;

import com.project.myFinances.controllers.requests.AuthResponse;
import com.project.myFinances.exceptions.AuthError;
import com.project.myFinances.models.entities.UserEntity;
import com.project.myFinances.repositories.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class UserServiceTest {

    @SpyBean
    UserService userService;

    @MockBean
    UserRepository userRepository;

    @Test
    public void authUserSuccess() {
        String email = "email@email.com";
        String password = "pass123";

        UserEntity user = UserEntity.builder().email(email).password(password).id(1l).build();
        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        AuthResponse result = userService.authenticate(email, password);

        Assertions.assertThat(result).isNotNull();
    }

    @Test
    public void authUserFail() {
        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());

        Throwable exception = Assertions.catchThrowable(() -> userService.authenticate("email@email.com", "123456"));

        Assertions.assertThat(exception).isInstanceOf(AuthError.class).hasMessage("User does not exist");
    }

    @Test
    public void authPasswordFail() {
        String email = "email@email.com";
        String password = "pass123";

        UserEntity user = UserEntity.builder().email(email).password(password).id(1l).build();
        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Throwable exception = Assertions.catchThrowable(() -> userService.authenticate("email@email.com", "123456"));

        Assertions.assertThat(exception).isInstanceOf(AuthError.class).hasMessage("Incorrect password");
    }

    @Test
    public void validateEmail() {
        Mockito.when(userRepository.existsByEmail(Mockito.anyString())).thenReturn(false);

        userService.validateEmail("email@email.com");
    }
}
