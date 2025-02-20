package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.dto.ExpenseResponseForStatistics;
import pl.tkaczyk.expensesservice.model.dto.IncomeRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeResponse;
import pl.tkaczyk.expensesservice.model.dto.StatisticsByMonthRequest;

import java.util.List;

public interface IncomeService {

    IncomeResponse save(IncomeRequest incomeRequest, String userId);

    IncomeResponse editIncome(IncomeRequest request);

    boolean deleteIncome(Long id);

    List<IncomeResponse> getAllIncomeByUser(String userId);

    List<IncomeResponse> getIncomeByUserByMonth(String userId, StatisticsByMonthRequest date, Boolean inGroup);

    List<ExpenseResponseForStatistics> getIncomStatisticByMonth(String userId, StatisticsByMonthRequest request);
}
