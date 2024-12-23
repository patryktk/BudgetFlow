package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryResponse;
import pl.tkaczyk.expensesservice.service.IncomeCategoryService;

import java.util.List;

@RestController
@RequestMapping("/expenses/incomeCategory")
@Tag(name = "IncomeCategory")
@RequiredArgsConstructor
public class IncomeCategoryController {

    private final IncomeCategoryService service;

    @GetMapping(value = "/getAllIncomeCategories", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IncomeCategoryResponse>> getAllIncomeCategories(@Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.findAllIncomeCategories(activeUserId));
    }

    @DeleteMapping(value = "/{incomeCategoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteIncomeCategory(@PathVariable Long incomeCategoryId,
                                                     @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        service.deleteIncomeCategory(incomeCategoryId, activeUserId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<IncomeCategoryResponse> createIncomeCategory(@RequestBody IncomeCategoryRequest request,
                                                                       @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.saveIncomeCategory(request, activeUserId));
    }
}
