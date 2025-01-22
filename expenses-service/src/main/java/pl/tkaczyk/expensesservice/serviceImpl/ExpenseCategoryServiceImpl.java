package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.handler.ResourceNotFoundException;
import pl.tkaczyk.expensesservice.mapper.ExpenseCategoryMapper;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.ExpenseCategoryResponse;
import pl.tkaczyk.expensesservice.model.dto.GroupResponse;
import pl.tkaczyk.expensesservice.repository.ExpenseCategoryRepository;
import pl.tkaczyk.expensesservice.service.ExpenseCategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExpenseCategoryServiceImpl implements ExpenseCategoryService {

    private final ExpenseCategoryRepository repository;
    private final ExpenseCategoryMapper mapper;
    private final GroupClient groupClient;

    @Override
    public void deleteExpenseCategory(Long id, String activeUserId) {
        ExpenseCategory expenseCategory = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense category not found"));
        if (!expenseCategory.getCreatedByUserId().equals(Long.valueOf(activeUserId))) {
            throw new IllegalStateException("You are not authorized to delete this expense category");
        }
        repository.deleteById(id);
    }

    @Override
    public List<ExpenseCategoryResponse> findAllExpenseCategories(String activeUserId) {
        GroupResponse body = groupClient.checkIfUserInAnyGroup(Long.valueOf(activeUserId)).getBody();
        if (body != null && body.isInGroup()) {
            return repository.findBySharedWithUsers(Long.valueOf(activeUserId))
                    .stream()
                    .map(mapper::toExpenseCategoryResponse)
                    .collect(Collectors.toList());
        }

        return repository.findAll()
                .stream()
                .map(mapper::toExpenseCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseCategoryResponse saveExpenseCategory(ExpenseCategoryRequest expenseCategoryRequest, String activeUserId) {
        ExpenseCategory expenseCategory = mapper.toExpenseCategory(expenseCategoryRequest, activeUserId);
        GroupResponse body = groupClient.checkIfUserInAnyGroup(Long.valueOf(activeUserId)).getBody();
        if (body != null && body.isInGroup()) {
            for (Long usersIdFromGroup : body.users()) {
                expenseCategory.addSharedWithUser(usersIdFromGroup);
            }
        } else {
            expenseCategory.addSharedWithUser(Long.valueOf(activeUserId));
        }
        return mapper.toExpenseCategoryResponse(repository.save(expenseCategory));

    }
}
