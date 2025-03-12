package pl.tkaczyk.expensesservice.repository;

import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.SumResponse;
import pl.tkaczyk.expensesservice.model.dto.StatisticsPartialProjection;

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


    @Query(value = """
            select ec.name as name, sum(e.amount) as amount, coalesce(avg_table.averageValue,0) as averageValue
                          from expense e
                                   join expense_category ec on ec.id = e.expense_category_id
                                   left join (SELECT DISTINCT ON (ec.id) ec.id                               as category_id,
                                                                         ec.name,
                                                                         sum(e.amount)                       AS amountIncomeInMonth,
                                                                         date_trunc('month', e.expense_date) AS month,
                                                                         AVG(SUM(e.amount)) OVER (
                                                                             PARTITION BY ec.id
                                                                             ORDER BY DATE_TRUNC('month', e.expense_date)
                                                                             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
                                                                             )                               AS averageValue
                                              FROM expense e
                                                       JOIN public.expense_category ec ON e.expense_category_id = ec.id
                                              WHERE e.expense_date < '2025-02-01'
                                                AND e.user_id = '1'
                                              GROUP BY month, ec.id
                                              ORDER BY ec.id, month DESC) avg_table on ec.id = avg_table.category_id
                          where e.expense_date >= :startDate
                            and e.expense_date <= :endDate
                            and e.user_id in :userIds
                          group by ec.id, avg_table.averageValue
            """, nativeQuery = true)
    List<StatisticsPartialProjection> findPartialExpensesByUsersByStartDateAndEndDate(@Param("startDate") LocalDate startDate,
                                                                                      @Param("endDate") LocalDate endDate,
                                                                                      @Param("userIds") Set<Long> users);


    @Query("""
            select expense
            from Expense expense
            where expense.expenseDate >= :startDate
            and expense.expenseDate <= :endDate
            and expense.userId in :userIds
            """)
    List<Expense> findExpensesByUserIdAndMonth(@Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate,
                                               @Param("userIds") Set<Long> userIds);

    @Query("""
            select ec.name, sum(e.amount) as value, e.expenseDate, ec.hexColor as date from Expense e
            left join ExpenseCategory ec on e.expenseCategory.id = ec.id
            where e.userId =:userId
            group by e.expenseDate, ec.id
            """)
    List<Tuple> findExpensesGroupByCategoryToCalendarFiled(@Param("userId") Long userId);

    @Query("""
            select sum(e.amount)
            from Expense e
            where e.expenseDate >= :startDate
            and e.expenseDate <= :endDate
            and e.userId =:userId
            """)
    Tuple findSumOfExpenseByUserIdAndDate(@Param("userId") Long userId,
                                                @Param("startDate") LocalDate startDate,
                                                @Param("endDate") LocalDate endDate);
}
