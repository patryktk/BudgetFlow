package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.dto.CategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse saveCategory(CategoryRequest request, String activeUserId);

    List<CategoryResponse> getCategoriesByType(CategoryRequest request, String activeUserId);

    void deleteCategory(Long categoryId, String activeUserId);

    CategoryResponse editCategory(CategoryRequest request, String activeUserId);
}
