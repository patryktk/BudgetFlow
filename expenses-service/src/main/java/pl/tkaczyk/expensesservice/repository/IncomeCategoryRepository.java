package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.IncomeCategory;

import java.util.List;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Long> {

    @Query("""
            select i
            from IncomeCategory i
            where :userId member of i.sharedWithUsers
            """)
    List<IncomeCategory> findBySharedWithUsers(@Param("userId") Long userId);
}
