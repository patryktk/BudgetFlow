package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;
import pl.tkaczyk.expensesservice.model.enums.CategoryType;

import java.util.List;

@Builder
public record CategoryResponse(
        Long id,
        String name,
        Long createdByUserId,
        String hexColor,
        Long parentId,
        List<Long> subCategories,
        CategoryType categoryType
) {
}
