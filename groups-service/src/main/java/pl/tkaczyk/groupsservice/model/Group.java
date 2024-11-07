package pl.tkaczyk.groupsservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_group")
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
