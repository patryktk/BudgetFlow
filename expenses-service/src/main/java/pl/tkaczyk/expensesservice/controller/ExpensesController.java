package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@Tag(name = "Expense")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenseService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseResponse>> getAllExpensesByUser(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        List<ExpenseResponse> allExpensesByUser = expenseService.getAllExpensesByUser(Long.parseLong(userId));
        return ResponseEntity.ok().body(allExpensesByUser);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseResponse> addExpense(@RequestBody @Valid ExpenseRequest request, @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId){
        return ResponseEntity.ok().body(expenseService.saveExpense(request, userId));
    }

    @DeleteMapping(value = "/{expenseId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteExpense(@PathVariable Long expenseId){
        return ResponseEntity.ok().body(expenseService.deleteExpenseById(expenseId));
    }
}
