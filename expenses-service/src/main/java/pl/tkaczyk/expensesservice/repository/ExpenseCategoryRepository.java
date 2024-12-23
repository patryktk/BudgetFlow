package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.util.List;
import java.util.Set;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

    @Query("""
            select c
            from ExpenseCategory c
            where :userId member of c.sharedWithUsers
            """)
    List<ExpenseCategory> findBySharedWithUsers(@Param("userId") Long userId);
}
