package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.mapper.ExpenseCategoryMapper;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.repository.ExpenseCategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/expenses/expenseCategory")
@Tag(name = "ExpensesCategory")
@RequiredArgsConstructor
public class ExpenseCategoryController {

    //TODO: przerobić to tak, żeby każdy miał swoje osobne kategorie, żeby nie powtarzały się dla wszystkich użytkowników

    private final ExpenseCategoryRepository repository;
    private final ExpenseCategoryMapper mapper;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExpenseCategory> saveExpenseCategory(@RequestBody ExpenseCategoryRequest request) {

        ExpenseCategory saved = repository.save(mapper.toExpenseCategory(request));
        return ResponseEntity.ok(saved);
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseCategory>> getAllExpenseCategory() {
        return ResponseEntity.ok(repository.findAll());
    }
}
