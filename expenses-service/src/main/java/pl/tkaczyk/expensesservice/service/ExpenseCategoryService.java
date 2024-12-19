package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryResponse;

import java.util.List;

public interface ExpenseCategoryService {

    void deleteExpenseCategory(Long id);

    List<ExpenseCategoryResponse> findAllExpenseCategories(String userId);

    ExpenseCategoryResponse saveExpenseCategory(ExpenseCategoryRequest expenseCategoryRequest, String userId);

}
