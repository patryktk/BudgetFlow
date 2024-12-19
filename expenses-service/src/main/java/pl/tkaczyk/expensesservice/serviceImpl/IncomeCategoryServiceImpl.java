package pl.tkaczyk.expensesservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.handler.ResourceNotFoundException;
import pl.tkaczyk.expensesservice.mapper.IncomeCategoryMapper;
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

    @Override
    public void deleteIncomeCategory(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Income category with id " + id + " not found");
        }
        repository.deleteById(id);
    }

    @Override
    public List<IncomeCategoryResponse> getAllIncomeCategories() {
        return repository.findAll()
                .stream()
                .map(mapper::toIncomeCategoryResponse)
                .collect(Collectors.toList());

    }

    @Override
    public IncomeCategoryResponse saveIncomeCategory(IncomeCategoryRequest request) {
        return mapper.toIncomeCategoryResponse(repository.save(mapper.toIncomeCategory(request)));
    }
}
