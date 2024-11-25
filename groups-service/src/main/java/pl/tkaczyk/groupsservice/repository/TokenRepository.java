package pl.tkaczyk.groupsservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pl.tkaczyk.groupsservice.model.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);

    @Modifying
    @Transactional
    @Query("""
            Delete from Token t
            where t.group.id=:groupId
            """)
    void deleteByGroupId(Long groupId);
}
