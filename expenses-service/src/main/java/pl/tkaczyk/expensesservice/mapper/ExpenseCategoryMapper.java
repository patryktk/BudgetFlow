package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryResponse;

import java.util.Collections;
import java.util.Optional;

@Service
public class ExpenseCategoryMapper {

    public ExpenseCategory toExpenseCategory(ExpenseCategoryRequest request, String userId, ExpenseCategory parentCategory){
        return ExpenseCategory.builder()
                .id(request.id())
                .name(request.name())
                .createdByUserId(Long.valueOf(userId))
                .hexColor(request.hexColor())
                .parentCategory(parentCategory)
                .build();
    }

    public ExpenseCategoryResponse toExpenseCategoryResponse(ExpenseCategory expenseCategory){
        return ExpenseCategoryResponse.builder()
                .id(expenseCategory.getId())
                .name(expenseCategory.getName())
                .createdByUserId(expenseCategory.getCreatedByUserId())
                .hexColor(expenseCategory.getHexColor())
                .parentId(expenseCategory.getParentCategory() != null ? expenseCategory.getParentCategory().getId() : null)
                .subCategories(Optional.ofNullable(expenseCategory.getSubCategories())
                        .orElse(Collections.emptyList())
                        .stream()
                        .map(ExpenseCategory::getId)
                        .toList())
                .build();
    }
}
