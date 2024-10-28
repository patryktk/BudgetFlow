package pl.tkaczyk.expensesservice.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface Mapstruct {
    ExpenseResponse mapToExpenseResponse(Expense expense);
    List<ExpenseResponse> mapToExpenseResponseList(List<Expense> expenses);

}
