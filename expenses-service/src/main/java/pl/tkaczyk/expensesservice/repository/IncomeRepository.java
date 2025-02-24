package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponsePartialProjection;
import pl.tkaczyk.expensesservice.model.dto.IncomeAverage;

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

    @Query("""
            select ic.name as name, sum(i.amount) as amount
              from Income i
              join IncomeCategory ic on ic = i.incomeCategory
              where i.incomeDate >= :startDate
              and i.incomeDate <= :endDate
              and i.userId in :userIds
              group by ic.id
              """)
    List<ExpenseResponsePartialProjection> findExpensesStatistics(@Param("startDate") LocalDate startDate,
                                                                  @Param("endDate") LocalDate endDate,
                                                                  @Param("userIds") Set<Long> userIds);

    @Query("""
            select ic.id, ic.name, i.amount, avg_table.average
                          from Income i
                                   join IncomeCategory ic on ic = i.incomeCategory
                          left join ( select ic.id as category_id, (sum(i.amount) / count(ic.id)) as average
                                      from Income i
                                               join IncomeCategory ic on ic = i.incomeCategory
                                      where i.incomeDate < :date
                                                  and i.userId = :userId
                                      group by ic.id) avg_table on ic.id = avg_table.category_id
                          where i.incomeDate >= :date
            """)
    List<IncomeAverage> findAverageIncomeValues(@Param("date") LocalDate date,
                                                @Param("userId") Long userId);
}
