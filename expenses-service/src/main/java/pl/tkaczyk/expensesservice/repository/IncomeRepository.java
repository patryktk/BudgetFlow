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
            select ic.name as name, sum(i.amount) as amount, coalesce(avg_table.averageValue, 0) as averageValue
            from Income i
                     join income_category ic on ic.id = i.income_category_id
                     left join (SELECT DISTINCT ON (ic.id) ic.id as category_id,
                                                           ic.name,
                                                           sum(i.amount)                      AS amountIncomeInMonth,
                                                           date_trunc('month', i.income_date) AS month,
                                                           AVG(SUM(i.amount)) OVER (
                                                               PARTITION BY ic.id
                                                               ORDER BY DATE_TRUNC('month', i.income_date)
                                                               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
                                                               )                              AS averageValue
                                FROM income i
                                         JOIN public.income_category ic ON i.income_category_id = ic.id
                                WHERE i.income_date < :startDate
                                  AND i.user_id in :userIds
                                GROUP BY month, ic.id
                                ORDER BY ic.id, month DESC) avg_table on ic.id = avg_table.category_id
            where i.income_date >= :startDate
              and i.income_date <= :endDate
              and i.user_id in :userIds
            group by ic.id, avg_table.averageValue            
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
