package pl.tkaczyk.expensesservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

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
}
