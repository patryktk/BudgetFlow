package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Category;
import pl.tkaczyk.expensesservice.model.enums.CategoryType;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("""
            select c
            from Category c
            where :userId member of c.sharedWithUsers
            and c.categoryType = :categoryType
            """)
    List<Category> findBySharedWithUsers(@Param("userId") Long userId, CategoryType categoryType);

    List<Category> findCategoryByCreatedByUserIdAndCategoryType(Long userId, CategoryType categoryType);
}
