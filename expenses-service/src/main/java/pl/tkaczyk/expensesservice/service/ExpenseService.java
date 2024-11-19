package pl.tkaczyk.expensesservice.service;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;

import java.util.List;

@Service
public interface ExpenseService {
    List<ExpenseResponse> getAllExpensesByUser(Long userId);

    ExpenseResponse saveExpense(ExpenseRequest request, String userId);

    Boolean deleteExpenseById(Long expenseId);
}
