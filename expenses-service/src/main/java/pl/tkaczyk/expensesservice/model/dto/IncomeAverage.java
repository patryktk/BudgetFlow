package pl.tkaczyk.expensesservice.model.dto;

public record IncomeAverage(
        Long id,
        String name,
        Double amount,
        Double average
) {
}
