package pl.tkaczyk.groupsservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.groupsservice.model.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);
}
