package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.tkaczyk.expensesservice.model.IncomeCategory;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Long> {
}
