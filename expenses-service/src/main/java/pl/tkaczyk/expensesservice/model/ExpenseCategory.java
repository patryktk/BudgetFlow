package pl.tkaczyk.expensesservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
    private String hexColor;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private ExpenseCategory parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    private List<ExpenseCategory> subCategories = new ArrayList<>();

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public void addSharedWithUser(Long userId) {
        if (this.sharedWithUsers == null) {
            this.sharedWithUsers = new HashSet<>();
        }
        this.sharedWithUsers.add(userId);
    }

    public void addSubCategory(ExpenseCategory subCategory) {
        subCategories.add(subCategory);
        subCategory.setParentCategory(this);
    }
}
