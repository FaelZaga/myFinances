package com.project.myFinances.repositories;

import com.project.myFinances.models.entities.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    public void emailDoesExist() {
        User user = createUser();
        entityManager.persist(user);

        boolean result = userRepository.existsByEmail("user@email.com");

        Assertions.assertThat(result).isTrue();
    }

    @Test
    public void emailDoesNotExist() {
        boolean result = userRepository.existsByEmail("user2@email.com");

        Assertions.assertThat(result).isFalse();
    }

    @Test
    public void persistUser() {
        User user = createUser();

        User userSaved = userRepository.save(user);

        Assertions.assertThat(userSaved.getId()).isNotNull();
    }

    @Test
    public void searchUserByEmail() {
        User user = createUser();
        entityManager.persist(user);

        Optional<User> result = userRepository.findByEmail("user@email.com");

        Assertions.assertThat(result.isPresent()).isTrue();
    }

    @Test
    public void searchUserByEmailThatDoesNotExist() {
        Optional<User> result = userRepository.findByEmail("user@email.com");

        Assertions.assertThat(result.isPresent()).isFalse();
    }

    public static User createUser() {
        return User.builder()
                .name("user")
                .email("user@email.com")
                .password("123456")
                .build();
    }
}