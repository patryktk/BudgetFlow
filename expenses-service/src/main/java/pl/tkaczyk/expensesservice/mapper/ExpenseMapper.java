package pl.tkaczyk.expensesservice.mapper;

import jakarta.persistence.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCalendarFieldInfo;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.model.dto.SumResponse;
import pl.tkaczyk.expensesservice.repository.ExpenseCategoryRepository;

import java.math.BigDecimal;
import java.time.LocalDate;


@Service
@RequiredArgsConstructor
public class ExpenseMapper {

    private final ExpenseCategoryMapper expenseCategoryMapper;
    private final ExpenseCategoryRepository expenseCategoryRepository;

    public Expense toExpense(ExpenseRequest request, String userId){
        if(request == null) return null;
        return Expense.builder()
                .id(request.id())
                .name(request.name())
                .amount(request.amount())
                .userId(Long.valueOf(userId))
                .expenseCategory(expenseCategoryRepository.findById(request.expenseCategoryRequest().id()).orElseThrow(() -> new IllegalArgumentException("Expense category not found")))
                .expenseDate(request.expenseDate())
                .note(request.note())
                .build();
    }

    public ExpenseResponse toExpenseResponse(Expense expense){
        if(expense == null) return null;
        return ExpenseResponse.builder()
                .id(expense.getId())
                .name(expense.getName())
                .amount(expense.getAmount())
                .expenseCategoryResponse(expenseCategoryMapper.toExpenseCategoryResponse(expense.getExpenseCategory()))
                .expenseDate(expense.getExpenseDate())
                .note(expense.getNote())
                .userId(expense.getUserId())
                .createdDate(expense.getCreatedDate())
                .lastModifiedDate(expense.getLastModifiedDate())
                .build();
    }

    public ExpenseCalendarFieldInfo toExpenseCalendarFieldInfo(Tuple tuple) {
        return ExpenseCalendarFieldInfo.builder()
                .name((String) tuple.get(0))
                .value(BigDecimal.valueOf((Double) tuple.get(1)))
                .date((LocalDate) tuple.get(2))
                .hexColor((String) tuple.get(3))
                .build();
    }

    public SumResponse toSumResponse(Tuple tuple) {
        return SumResponse.builder()
                .sum((Double) tuple.get(0))
                .build();
    }
}
