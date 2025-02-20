package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponsePartialProjection;

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
            select ec.name as name, sum(e.amount) as amount
              from Expense e
              join ExpenseCategory ec on ec = e.expenseCategory
              where e.expenseDate >= :startDate
              and e.expenseDate <= :endDate
              and e.userId in :userIds
              group by ec.id
              """)
    List<ExpenseResponsePartialProjection> findExpensesStatistics(@Param("startDate") LocalDate startDate,
                                                                  @Param("endDate") LocalDate endDate,
                                                                  @Param("userIds") Set<Long> userIds);
}
