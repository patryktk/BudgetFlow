package pl.tkaczyk.usersservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.usersservice.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
