package pl.tkaczyk.expensesservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Income {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double amount;
    private LocalDate incomeDate;
    private Long userId;
    @ManyToOne
    @JoinColumn(name = "incomeCategoryId")
    private IncomeCategory incomeCategory;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
}
