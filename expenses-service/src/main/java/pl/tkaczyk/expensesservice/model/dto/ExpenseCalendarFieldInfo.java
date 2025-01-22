package pl.tkaczyk.expensesservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Data
public class ExpenseCalendarFieldInfo {
    String name;
    BigDecimal value;
    LocalDate date;
    String hexColor;
}
