package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.mapper.ExpenseMapper;
import pl.tkaczyk.expensesservice.mapper.StatisticsPartialMapper;
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
    private final StatisticsPartialMapper statisticsPartialMapper;

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
    public List<ResponseForStatistics> getExpensesStatisticsByMonth(String userId, StatisticsByMonthRequest request) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId)).getBody();
        List<StatisticsPartialProjection> expensesByStartDateAndEndDate;
        if (groupResponse.isInGroup()) {
            expensesByStartDateAndEndDate = expenseRepository.findPartialExpensesByUsersByStartDateAndEndDate(LocalDate.parse(request.startDate())
                    ,LocalDate.parse(request.endDate()),
                    groupResponse.users());
        } else {
            expensesByStartDateAndEndDate = expenseRepository.findPartialExpensesByUsersByStartDateAndEndDate(LocalDate.parse(request.startDate())
                    ,LocalDate.parse(request.endDate())
                    , Collections.singleton(Long.valueOf(userId)));
        }
        return expensesByStartDateAndEndDate.stream().map(statisticsPartialMapper::toStatisticsResponse).collect(Collectors.toList());
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
    public List<ExpenseResponse> getAllExpensesByUserByMonth(String userId, StatisticsByMonthRequest request, Boolean inGroup) {
        if(inGroup){
            ResponseEntity<GroupResponse> groupResponseResponseEntity = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId));
            if (groupResponseResponseEntity.getStatusCode().is2xxSuccessful() && groupResponseResponseEntity.getBody() != null && groupResponseResponseEntity.getBody().isInGroup()) {
                return expenseRepository.findExpensesByUserIdAndMonth(LocalDate.parse(request.startDate()),
                                LocalDate.parse(request.endDate()),
                                groupResponseResponseEntity.getBody().users())
                        .stream()
                        .map(expenseMapper::toExpenseResponse)
                        .collect(Collectors.toList());
            }
        }
        return expenseRepository.findExpensesByUserIdAndMonth(LocalDate.parse(request.startDate()),
                        LocalDate.parse(request.endDate()),
                        Collections.singleton(Long.valueOf(userId)))
                .stream()
                .map(expenseMapper::toExpenseResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseCalendarFieldInfo> getExpensesToCalendarByCategory(String userId) {
        return expenseRepository.findExpensesGroupByCategoryToCalendarFiled(Long.valueOf(userId))
                .stream()
                .map(expenseMapper::toExpenseCalendarFieldInfo)
                .collect(Collectors.toList());
    }
}
