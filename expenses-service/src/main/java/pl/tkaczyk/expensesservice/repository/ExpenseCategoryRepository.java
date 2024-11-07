package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

    ExpenseCategory findByName(String name);
}
