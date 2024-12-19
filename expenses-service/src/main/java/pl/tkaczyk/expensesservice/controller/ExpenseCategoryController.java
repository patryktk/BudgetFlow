package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryResponse;
import pl.tkaczyk.expensesservice.service.ExpenseCategoryService;

import java.util.List;

@RestController
@RequestMapping("/expenses/expenseCategory")
@Tag(name = "ExpensesCategory")
@RequiredArgsConstructor
public class ExpenseCategoryController {

    //TODO: przerobić to tak, żeby każdy miał swoje osobne kategorie, żeby nie powtarzały się dla wszystkich użytkowników

    private final ExpenseCategoryService service;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseCategoryResponse> saveExpenseCategory(@RequestBody ExpenseCategoryRequest request,
                                                                       @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(service.saveExpenseCategory(request,userId));
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseCategoryResponse>> getAllExpenseCategory(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(service.findAllExpenseCategories(userId));
    }

    @DeleteMapping(value = "/{expenseCategoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteExpenseCategory(@PathVariable Long expenseCategoryId) {
        service.deleteExpenseCategory(expenseCategoryId);
        return ResponseEntity.noContent().build();
    }
}
