package pl.tkaczyk.expensesservice.model;

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
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseCategory {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Long createdByUserId;

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public void addSharedWithUser(Long userId) {
        if (this.sharedWithUsers == null) {
            this.sharedWithUsers = new HashSet<>();
        }
        this.sharedWithUsers.add(userId);
    }
}
