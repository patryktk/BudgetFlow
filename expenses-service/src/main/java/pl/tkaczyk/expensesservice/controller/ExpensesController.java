package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.*;
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
        return ResponseEntity.ok().body(expenseService.getAllExpenses(Long.parseLong(userId)));
    }

    @PostMapping(value = "/expenseByMonth", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseResponse>> getAllExpenseByUserByMonth(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                                            @RequestBody StatisticsByMonthRequest request,
                                                                            @RequestParam Boolean inGroup) {
        return ResponseEntity.ok().body(expenseService.getAllExpensesByUserByMonth(userId, request, inGroup));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseResponse> updateExpense(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                         @RequestBody ExpenseRequest expenseRequest) {
        return ResponseEntity.ok().body(expenseService.updateExpense(expenseRequest, userId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseResponse> addExpense(@RequestBody @Valid ExpenseRequest request, @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok().body(expenseService.saveExpense(request, userId));
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteExpense(@RequestParam Long expenseId) {
        return ResponseEntity.ok().body(expenseService.deleteExpenseById(expenseId));
    }

    @PostMapping(value = "/statistics", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ResponseForStatistics>> getStatisticsByMonth(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                                            @RequestBody StatisticsByMonthRequest request) {
        return ResponseEntity.ok().body(expenseService.getExpensesStatisticsByMonth(userId, request));
    }

    @GetMapping(value = "/expensesToCalendarByCategory", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseCalendarFieldInfo>> getExpensesToCalendarByCategory(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok().body(expenseService.getExpensesToCalendarByCategory(userId));
    }
}
