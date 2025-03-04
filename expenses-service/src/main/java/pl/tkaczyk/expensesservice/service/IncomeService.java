package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.dto.*;

import java.util.List;

public interface IncomeService {

    IncomeResponse save(IncomeRequest incomeRequest, String userId);

    IncomeResponse editIncome(IncomeRequest request);

    boolean deleteIncome(Long id);

    List<IncomeResponse> getAllIncomeByUser(String userId);

    List<IncomeResponse> getIncomeByUserByMonth(String userId, StatisticsByMonthRequest date, Boolean inGroup);

    List<ResponseForStatistics> getIncomeStatisticByMonth(String userId, StatisticsByMonthRequest request);

    SumResponse getSumOfIncomes(String userId, StatisticsByMonthRequest request);
}
