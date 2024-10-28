package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;

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
}
