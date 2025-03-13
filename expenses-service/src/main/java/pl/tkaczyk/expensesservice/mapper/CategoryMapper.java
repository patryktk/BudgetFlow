package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Category;
import pl.tkaczyk.expensesservice.model.dto.CategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.CategoryResponse;

import java.util.Collections;
import java.util.Optional;

@Service
public class CategoryMapper {

    public Category toCategory(CategoryRequest request, String userId, Category parentCategory) {
        return Category.builder()
                .id(request.id())
                .name(request.name())
                .createdByUserId(Long.valueOf(userId))
                .hexColor(request.hexColor())
                .parentCategory(parentCategory)
                .categoryType(request.categoryType())
                .build();
    }

    public CategoryResponse toCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .hexColor(category.getHexColor())
                .categoryType(category.getCategoryType())
                .parentId(category.getParentCategory() != null ? category.getParentCategory().getId() : null)
                .subCategories(Optional.ofNullable(category.getSubCategories())
                        .orElse(Collections.emptyList())
                        .stream()
                        .map(Category::getId)
                        .toList())
                .build();
    }
}
