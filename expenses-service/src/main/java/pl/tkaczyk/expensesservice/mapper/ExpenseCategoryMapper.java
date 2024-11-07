package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;

@Service
public class ExpenseCategoryMapper {

    public ExpenseCategory toExpenseCategory(ExpenseCategoryRequest request){
        return ExpenseCategory.builder()
                .id(request.id())
                .name(request.name())
                .build();
    }
}
