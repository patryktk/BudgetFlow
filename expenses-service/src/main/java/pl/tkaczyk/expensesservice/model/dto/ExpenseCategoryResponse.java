package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record ExpenseCategoryResponse(
        Long id,
        String name,
        Long createdByUserId,
        String hexColor,
        Long parentId,
        List<Long> subCategories
) {
}
