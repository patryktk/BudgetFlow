package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.util.List;
import java.util.Set;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

    List<ExpenseCategory> findBySharedWithUsers(Set<Long> sharedWithUsers);
}
