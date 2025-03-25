package pl.tkaczyk.expensesservice.model;

import jakarta.persistence.*;
import lombok.*;
import pl.tkaczyk.expensesservice.model.enums.CategoryType;

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
public class Category {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Long createdByUserId;
    private String hexColor;
    @Enumerated(EnumType.ORDINAL)
    private CategoryType categoryType;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    private List<Category> subCategories = new ArrayList<>();

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public void addSharedWithUser(Long userId) {
        if (this.sharedWithUsers == null) {
            this.sharedWithUsers = new HashSet<>();
        }
        this.sharedWithUsers.add(userId);
    }

    public void addSubCategory(Category subCategory) {
        subCategories.add(subCategory);
        subCategory.setParentCategory(this);
    }
}
