package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.CategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.CategoryResponse;
import pl.tkaczyk.expensesservice.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/expenses/category")
@Tag(name = "Category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CategoryResponse> saveCategory(@RequestBody CategoryRequest request,
                                                         @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.saveCategory(request, activeUserId));
    }

    @GetMapping(value = "/getCategoriesByType", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CategoryResponse>> getAllCategory(@RequestBody CategoryRequest request,
                                                                 @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        return ResponseEntity.ok(service.getCategoriesByType(request, activeUserId));
    }

    @DeleteMapping(value = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteCategory(@PathVariable Long categoryId,
                                                  @Parameter(hidden = true) @RequestHeader("X-User-Id") String activeUserId) {
        service.deleteCategory(categoryId, activeUserId);
        return ResponseEntity.noContent().build();
    }
}
