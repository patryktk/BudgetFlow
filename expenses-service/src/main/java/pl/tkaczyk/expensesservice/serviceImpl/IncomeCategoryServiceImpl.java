package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.handler.ResourceNotFoundException;
import pl.tkaczyk.expensesservice.mapper.IncomeCategoryMapper;
import pl.tkaczyk.expensesservice.model.IncomeCategory;
import pl.tkaczyk.expensesservice.model.dto.GroupResponse;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryResponse;
import pl.tkaczyk.expensesservice.repository.IncomeCategoryRepository;
import pl.tkaczyk.expensesservice.service.IncomeCategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeCategoryServiceImpl implements IncomeCategoryService {

    private final IncomeCategoryRepository repository;
    private final IncomeCategoryMapper mapper;
    private final GroupClient groupClient;

    @Override
    public void deleteIncomeCategory(Long id, String activeUserId) {
        IncomeCategory incomeCategoryNotFound = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Income category not found"));
        if (!incomeCategoryNotFound.getCreatedByUserId().equals(activeUserId)) {
            throw new IllegalStateException("You are not authorized to delete this income category");
        }
        repository.deleteById(id);
    }

    @Override
    public List<IncomeCategoryResponse> findAllIncomeCategories(String activeUserId) {
        GroupResponse body = groupClient.checkIfUserInAnyGroup(Long.valueOf(activeUserId)).getBody();
        if(body != null && body.isInGroup()){
            return repository.findBySharedWithUsers(Long.valueOf(activeUserId))
                    .stream()
                    .map(mapper::toIncomeCategoryResponse)
                    .collect(Collectors.toList());
        }
        return repository.findAll()
                .stream()
                .map(mapper::toIncomeCategoryResponse)
                .collect(Collectors.toList());

    }

    @Override
    public IncomeCategoryResponse saveIncomeCategory(IncomeCategoryRequest request, String activeUserId) {
        IncomeCategory incomeCategory = mapper.toIncomeCategory(request, activeUserId);
        GroupResponse body = groupClient.checkIfUserInAnyGroup(Long.valueOf(activeUserId)).getBody();
        if (body != null && body.isInGroup()) {
            for (Long usersIdFromGroup : body.users()) {
                incomeCategory.addSharedWithUser(usersIdFromGroup);
            }
        } else {
            incomeCategory.addSharedWithUser(Long.valueOf(activeUserId));
        }
        return mapper.toIncomeCategoryResponse(repository.save(incomeCategory));
    }
}
