package pl.tkaczyk.expensesservice.service;

import pl.tkaczyk.expensesservice.model.Expense;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;

import java.util.List;

public interface ExpenseService {
    List<ExpenseResponse> getAllExpensesByUser(Long userId);

    ExpenseResponse saveExpense(ExpenseRequest request);
}
