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

    private final ExpenseCategoryService service;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseCategoryResponse> saveExpenseCategory(@RequestBody ExpenseCategoryRequest request,
                                                                       @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.saveExpenseCategory(request, activeUserId));
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseCategoryResponse>> getAllExpenseCategory(@Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.findAllExpenseCategories(activeUserId));
    }

    @DeleteMapping(value = "/{expenseCategoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteExpenseCategory(@PathVariable Long expenseCategoryId,
                                                         @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        service.deleteExpenseCategory(expenseCategoryId, activeUserId);
        return ResponseEntity.noContent().build();
    }
}
