package pl.tkaczyk.groupsservice.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private Long createdByUserId;
    @ElementCollection
    private Set<Long> users;

    public void addUser(Long userId) {
        if (this.users == null) {
            this.users = new HashSet<>();
        }
        this.users.add(userId);
    }

}
