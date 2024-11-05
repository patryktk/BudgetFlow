package pl.tkaczyk.groupsservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.groupsservice.model.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {
}
