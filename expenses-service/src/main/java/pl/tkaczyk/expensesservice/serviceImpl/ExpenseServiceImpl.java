package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.mapper.ExpenseMapper;
import pl.tkaczyk.expensesservice.mapper.Mapstruct;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.repository.ExpenseRepository;
import pl.tkaczyk.expensesservice.service.ExpenseService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final Mapstruct mapstruct;
    private final ExpenseMapper expenseMapper;

    @Override
    public List<ExpenseResponse> getAllExpensesByUser(Long userId) {
        return mapstruct.mapToExpenseResponseList(expenseRepository.findExpensesByUserId(userId));
    }

    @Override
    public ExpenseResponse saveExpense(ExpenseRequest request) {
        return mapstruct.mapToExpenseResponse(expenseRepository.save(expenseMapper.toExpense(request)));
    }
}
