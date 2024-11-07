package pl.tkaczyk.expensesservice.model.dto;

public record ExpenseCategoryRequest(
        Long id,
        String name
) {
}
