package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryResponse;

import java.util.List;

public interface IncomeCategoryService {

    void deleteIncomeCategory(Long id);

    List<IncomeCategoryResponse> getAllIncomeCategories();

    IncomeCategoryResponse saveIncomeCategory(IncomeCategoryRequest request);
}
