package pl.tkaczyk.groupsservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> getGroupByUsersContaining(Long userId);
}
