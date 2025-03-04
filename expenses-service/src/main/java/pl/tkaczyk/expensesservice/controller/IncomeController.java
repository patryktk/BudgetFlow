package pl.tkaczyk.expensesservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.expensesservice.model.dto.*;
import pl.tkaczyk.expensesservice.service.IncomeService;

import java.util.List;

@RestController
@RequestMapping("/expenses/income")
@Tag(name = "Income")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<IncomeResponse> addIncome(@RequestBody IncomeRequest request,
                                                    @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(incomeService.save(request, userId));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<IncomeResponse> updateIncome(@RequestBody IncomeRequest request,
                                                       @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(incomeService.editIncome(request));
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteIncome(@RequestParam("id") Long id,
                                                @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(incomeService.deleteIncome(id));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IncomeResponse>> getAllIncomeByUser(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(incomeService.getAllIncomeByUser(userId));
    }

    @PostMapping(value = "/incomeByMonth", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IncomeResponse>> getIncomeByUserByMonth(@RequestBody StatisticsByMonthRequest request,
                                                                       @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                                       @RequestParam Boolean inGroup) {
        return ResponseEntity.ok(incomeService.getIncomeByUserByMonth(userId, request, inGroup));
    }

    @PostMapping(value = "/statistics", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ResponseForStatistics>> getStatisticsByMonth(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                                            @RequestBody StatisticsByMonthRequest request) {
        return ResponseEntity.ok().body(incomeService.getIncomeStatisticByMonth(userId, request));
    }

    @PostMapping(value = "/getSumOfIncomes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SumResponse> getSumOfExpensesByMonth(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
                                                               @RequestBody StatisticsByMonthRequest request) {
        return ResponseEntity.ok().body(incomeService.getSumOfIncomes(userId,request));
    }

}
