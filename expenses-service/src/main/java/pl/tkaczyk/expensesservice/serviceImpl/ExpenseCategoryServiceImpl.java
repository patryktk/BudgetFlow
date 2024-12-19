package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public void deleteExpenseCategory(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Income category with id " + id + " not found");
        }
        repository.deleteById(id);
    }

    @Override
    public List<ExpenseCategoryResponse> findAllExpenseCategories(String userId) {
        //TODO: Sprawdzić czy jest w grupie i w zależności od tego zwrócić odpowiednią listę
        ResponseEntity<GroupResponse> groupResponseResponseEntity = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId));
        if(groupResponseResponseEntity.getBody().isInGroup()){
           return
        }

        return repository.findAll()
                .stream()
                .map(mapper::toExpenseCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseCategoryResponse saveExpenseCategory(ExpenseCategoryRequest expenseCategoryRequest, String userId) {
        ExpenseCategory expenseCategory = mapper.toExpenseCategory(expenseCategoryRequest, userId);
        expenseCategory.addSharedWithUser(Long.valueOf(userId));
        return mapper.toExpenseCategoryResponse(repository.save(expenseCategory));
    }
}
