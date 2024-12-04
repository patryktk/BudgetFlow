package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.mapper.ExpenseMapper;
import pl.tkaczyk.expensesservice.mapper.ExpenseStatisticsMapper;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.*;
import pl.tkaczyk.expensesservice.repository.ExpenseRepository;
import pl.tkaczyk.expensesservice.service.ExpenseService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final GroupClient groupClient;
    private final ExpenseStatisticsMapper expenseStatisticsMapper;

    @Override
    public List<ExpenseResponse> getAllExpenses(Long userId) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(userId).getBody();
        if (groupResponse.isInGroup()) {
            return expenseRepository.findExpenseByUserIds(groupResponse.users())
                    .stream()
                    .map(expenseMapper::toExpenseResponse)
                    .collect(Collectors.toList());
        } else {
            return expenseRepository.findExpensesByUserId(userId).stream()
                    .map(expenseMapper::toExpenseResponse)
                    .collect(Collectors.toList());
        }
    }

    @Override
    public ExpenseResponse saveExpense(ExpenseRequest request, String userId) {
        Expense expense = expenseMapper.toExpense(request);
        expense.setUserId(Long.valueOf(userId));
        return expenseMapper.toExpenseResponse(expenseRepository.save(expense));
    }

    @Override
    public Boolean deleteExpenseById(Long expenseId) {
        expenseRepository.deleteById(expenseId);
        return true;
    }

    @Override
    public List<ExpenseResponseForStatistics> getAllExpensesStatistics(String userId) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId)).getBody();
        List<ExpenseResponsePartialProjection> expensesStatistics;
        if (groupResponse.isInGroup()) {
            expensesStatistics = expenseRepository.findExpensesStatistics(groupResponse.users());

        } else {
            expensesStatistics = expenseRepository.findExpensesStatistics(Collections.singleton(Long.valueOf(userId)));
        }
        //TODO: Wyliczyć to do średniej? Ale nie ma jeszcze, żadnej średniej wartości. Czyli zrobić to w przyszłości jak będą dane historyczne
        return expensesStatistics.stream().map(expenseStatisticsMapper::toExpenseResponseForStatistics).collect(Collectors.toList());
    }

    @Override
    public List<ExpenseResponseForStatistics> getExpensesStatisticsByMonth(String userId, StatisticsByMonthRequest request) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId)).getBody();
        List<ExpenseResponsePartialProjection> expensesByStartDateAndEndDate;
        if (groupResponse.isInGroup()) {
            expensesByStartDateAndEndDate = expenseRepository.findPartialExpensesByUsersByStartDateAndEndDate(LocalDate.parse(request.startDate())
                    ,LocalDate.parse(request.endDate()),
                    groupResponse.users());
        } else {
            expensesByStartDateAndEndDate = expenseRepository.findPartialExpensesByUsersByStartDateAndEndDate(LocalDate.parse(request.startDate())
                    ,LocalDate.parse(request.endDate())
                    , Collections.singleton(Long.valueOf(userId)));
        }
        //TODO: Dodać wyliczanie średniej jak będzie już pomysł na to
        return expensesByStartDateAndEndDate.stream().map(expenseStatisticsMapper::toExpenseResponseForStatistics).collect(Collectors.toList());
    }

    @Override
    public ExpenseResponse updateExpense(ExpenseRequest expenseRequest, String userId) {
        Expense expenseToEdit = expenseRepository.findById(expenseRequest.id()).orElseThrow(() -> new IllegalArgumentException("Expense does not exist"));
        expenseToEdit.setName(expenseRequest.name());
        expenseToEdit.setExpenseCategory(expenseRequest.expenseCategory());
        expenseToEdit.setAmount(expenseRequest.amount());
        expenseToEdit.setExpenseDate(expenseRequest.expenseDate());
        expenseToEdit.setNote(expenseRequest.note());
        expenseRepository.save(expenseToEdit);
        return expenseMapper.toExpenseResponse(expenseToEdit);
    }

    @Override
    public List<ExpenseResponse> getAllExpensesByUserByMonth(String userId, StatisticsByMonthRequest request) {
        return expenseRepository.findExpensesByUserIdAndMonth(LocalDate.parse(request.startDate()),
                        LocalDate.parse(request.endDate()),
                        Collections.singleton(Long.valueOf(userId)))
                .stream()
                .map(expenseMapper::toExpenseResponse)
                .collect(Collectors.toList());
    }
}
