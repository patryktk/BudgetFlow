package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.mapper.ExpenseMapper;
import pl.tkaczyk.expensesservice.model.dto.ExpenseRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseResponse;
import pl.tkaczyk.expensesservice.repository.ExpenseRepository;
import pl.tkaczyk.expensesservice.service.ExpenseService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    public List<ExpenseResponse> getAllExpensesByUser(Long userId) {
        return expenseRepository.findExpensesByUserId(userId).stream()
                .map(expenseMapper::toExpenseResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseResponse saveExpense(ExpenseRequest request) {
        return expenseMapper.toExpenseResponse(expenseRepository.save(expenseMapper.toExpense(request)));
    }

    @Override
    public Boolean deleteExpenseById(Long expenseId) {
        expenseRepository.deleteById(expenseId);
        return true;
    }
}
