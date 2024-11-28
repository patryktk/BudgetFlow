package pl.tkaczyk.expensesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.tkaczyk.expensesservice.model.Income;

import java.time.LocalDate;
import java.util.List;

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
}
