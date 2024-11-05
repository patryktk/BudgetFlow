package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.service.ExpenseService;


import java.util.List;

@RestController
@RequestMapping("/expenses")
@Tag(name = "Expense")
public class ExpensesController {

    private final ExpenseService expenseService;

    public ExpensesController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpensesByUser(@RequestHeader("X-User-Id") String userId) {
        List<ExpenseResponse> allExpensesByUser = expenseService.getAllExpensesByUser(Long.parseLong(userId));
        return ResponseEntity.ok().body(allExpensesByUser);
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(@RequestBody @Valid ExpenseRequest request){
        return ResponseEntity.ok().body(expenseService.saveExpense(request));
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Boolean> deleteExpense(@RequestHeader("X-User-Id") String userId, @PathVariable Long expenseId){
        return ResponseEntity.ok().body(expenseService.deleteExpenseById(expenseId));
    }
}
