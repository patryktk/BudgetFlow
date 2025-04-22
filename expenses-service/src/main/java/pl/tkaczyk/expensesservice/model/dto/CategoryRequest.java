package pl.tkaczyk.expensesservice.model.dto;

import pl.tkaczyk.expensesservice.model.enums.CategoryType;

public record CategoryRequest(
        Long id,
        String name,
        String hexColor,
        Long parentId,
        CategoryType categoryType
) {

}
