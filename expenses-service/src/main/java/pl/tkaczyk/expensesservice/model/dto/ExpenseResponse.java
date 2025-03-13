package pl.tkaczyk.expensesservice.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record ExpenseResponse(
        Long id,
        String name,
        ExpenseCategoryResponse expenseCategoryResponse,
        @Schema(description = "Kwota wydatku", required = true)
        @NotNull(message = "Kwota nie może być pusta")
        double amount,
        LocalDate expenseDate,
        String note,
        Long userId,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {
}
