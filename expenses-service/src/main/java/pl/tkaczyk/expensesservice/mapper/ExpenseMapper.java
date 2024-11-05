package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;


@Service
public class ExpenseMapper {

    public Expense toExpense(ExpenseRequest request){
        if(request == null) return null;
        return Expense.builder()
                .id(request.id())
                .name(request.name())
                .expenseCategory(request.expenseCategory())
                .expenseDate(request.expenseDate())
                .note(request.note())
                .userId(request.userId())
                .build();
    }

    public ExpenseResponse toExpenseResponse(Expense expense){
        if(expense == null) return null;
        return ExpenseResponse.builder()
                .id(expense.getId())
                .name(expense.getName())
                .expenseCategory(expense.getExpenseCategory())
                .expenseDate(expense.getExpenseDate())
                .note(expense.getNote())
                .userId(expense.getUserId())
                .createdDate(expense.getCreatedDate())
                .lastModifiedDate(expense.getLastModifiedDate())
                .build();
    }
}
