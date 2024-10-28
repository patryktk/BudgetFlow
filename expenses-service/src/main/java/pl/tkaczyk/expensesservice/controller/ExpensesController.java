package pl.tkaczyk.expensesservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenseService;


    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpensesByUser(@RequestHeader("X-User-Id") String userId) {
        List<ExpenseResponse> allExpensesByUser = expenseService.getAllExpensesByUser(Long.parseLong(userId));
        return ResponseEntity.ok().body(allExpensesByUser);
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(@RequestBody ExpenseRequest request){
        return ResponseEntity.ok().body(expenseService.saveExpense(request));
    }
}
