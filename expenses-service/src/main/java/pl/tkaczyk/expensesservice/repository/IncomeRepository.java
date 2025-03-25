package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.StatisticsPartialProjection;
import pl.tkaczyk.expensesservice.model.dto.SumResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findIncomesByUserId(Long userId);

    @Query("""
            select inc
            from Income inc
            where inc.incomeDate >= :startDate
            and inc.incomeDate <= :endDate
            and inc.userId = :userId
            """)
    List<Income> findIncomesByUserIdAndMonth(@Param("userId") String userId,
                                             @Param("startDate") LocalDate startDate,
                                             @Param("endDate") LocalDate endDate);

    @Query("""
            select inc
            from Income inc
            where inc.incomeDate >= :startDate
            and inc.incomeDate <= :endDate
            and inc.userId in :usersId
            """)
    List<Income> findIncomesByUsersIdAndMonth(@Param("usersId") Set<Long> usersId,
                                              @Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate);

    @Query(value = """
            select cat.name as name, sum(i.amount) as amount, coalesce(avg_table.averageValue, 0) as averageValue
            from Income i
                     join category cat on cat.id = i.category_id
                     left join (SELECT DISTINCT ON (cat.id) cat.id as category_id,
                                                           cat.name,
                                                           sum(i.amount)                      AS amountIncomeInMonth,
                                                           date_trunc('month', i.income_date) AS month,
                                                           AVG(SUM(i.amount)) OVER (
                                                               PARTITION BY cat.id
                                                               ORDER BY DATE_TRUNC('month', i.income_date)
                                                               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
                                                               )                              AS averageValue
                                FROM income i
                                         JOIN public.category cat ON i.category_id = cat.id
                                WHERE i.income_date < :startDate
                                  AND i.user_id in :userIds
                                and cat.category_type = "INCOME"
                                GROUP BY month, cat.id
                                ORDER BY cat.id, month DESC) avg_table on cat.id = avg_table.category_id
            where i.income_date >= :startDate
              and i.income_date <= :endDate
              and i.user_id in :userIds
            and cat.category_type = "INCOME"
            group by cat.id, avg_table.averageValue            
                          """, nativeQuery = true)
    List<StatisticsPartialProjection> findExpensesStatistics(@Param("startDate") LocalDate startDate,
                                                             @Param("endDate") LocalDate endDate,
                                                             @Param("userIds") Set<Long> userIds);

    @Query("""
            select sum(i.amount)
            from Income i
            where i.incomeDate >= :startDate
            and i.incomeDate <= :endDate
            and i.userId =:userIds
            """)
    SumResponse findSumOfExpenseByUserIdAndDate(@Param("userId") Long userId,
                                                @Param("startDate") LocalDate startDate,
                                                @Param("endDate") LocalDate endDate);
}
