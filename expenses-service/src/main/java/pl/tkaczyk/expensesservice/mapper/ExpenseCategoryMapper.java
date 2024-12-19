package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryResponse;

@Service
public class ExpenseCategoryMapper {

    public ExpenseCategory toExpenseCategory(ExpenseCategoryRequest request, String userId){
        return ExpenseCategory.builder()
                .id(request.id())
                .name(request.name())
                .createdByUser(Long.valueOf(userId))
                .build();
    }

    public ExpenseCategoryResponse toExpenseCategoryResponse(ExpenseCategory expenseCategory){
        return ExpenseCategoryResponse.builder()
                .id(expenseCategory.getId())
                .name(expenseCategory.getName())
                .build();
    }
}
