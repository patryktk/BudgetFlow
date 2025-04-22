package pl.tkaczyk.expensesservice.service;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.dto.*;

import java.util.List;

@Service
public interface ExpenseService {
    List<ExpenseResponse> getAllExpenses(Long userId);

    ExpenseResponse saveExpense(ExpenseRequest request, String userId);

    Boolean deleteExpenseById(Long expenseId);

    List<ResponseForStatistics> getExpensesStatisticsByMonth(String userId, StatisticsByMonthRequest request);

    ExpenseResponse updateExpense(ExpenseRequest expenseRequest, String userId);

    List<ExpenseResponse> getAllExpensesByUserByMonth(String userId, StatisticsByMonthRequest request, Boolean inGroup);

    List<ExpenseCalendarFieldInfo> getExpensesToCalendarByCategory(String userId);

    SumResponse getExpensesSumByMonth(String userId, StatisticsByMonthRequest request);
}
