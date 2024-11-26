package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponsePartialProjection;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findExpensesByUserId(Long userId);


    @Query("""
        select e
        from Expense e
        where e.userId in :userIds
        """)
    List<Expense> findExpenseByUserIds(@Param("userIds") Set<Long> userIds);

    @Query("""
            select ec.name as name, sum(e.amount) as amount
            from Expense e
            join ExpenseCategory ec on ec = e.expenseCategory
            where e.userId in :userIds
            group by ec.name
            """)
    List<ExpenseResponsePartialProjection> findExpensesStatistics(@Param("userIds") Set<Long> userIds);

    @Query("""
            select ec.name, sum(e.amount) as value
            from Expense e
            join ExpenseCategory ec on ec = e.expenseCategory
            where e.expenseDate >= :startDate
            and e.expenseDate <= :endDate
            and e.userId in :userIds
            group by ec.name
            """)
    List<ExpenseResponsePartialProjection> findExpensesByStartDateAndEndDate(@Param("startDate") LocalDate startDate,
                                                                             @Param("endDate") LocalDate endDate,
                                                                             @Param("userIds") Set<Long> users);
}
