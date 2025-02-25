package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponseForStatistics;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponsePartialProjection;

@Service
public class ExpenseStatisticsMapper {

    public ExpenseResponseForStatistics toExpenseResponseForStatistics(ExpenseResponsePartialProjection projection) {
        return ExpenseResponseForStatistics.builder()
                .name(projection.getName())
                .amount(projection.getAmount())
                .build();
    }
}
