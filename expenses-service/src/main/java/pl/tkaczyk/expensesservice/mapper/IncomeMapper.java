package pl.tkaczyk.expensesservice.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.IncomeRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeResponse;
import pl.tkaczyk.expensesservice.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
public class IncomeMapper {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public Income toIncome(IncomeRequest request){
        return Income.builder()
                .id(request.id())
                .name(request.name())
                .amount(request.amount())
                .category(categoryRepository.findById(request.categoryRequest().id()).orElseThrow(() -> new IllegalArgumentException("Income category not found") ))
                .incomeDate(request.incomeDate())
                .build();
    }

    public IncomeResponse toIncomeResponse(Income income){
        return IncomeResponse.builder()
                .id(income.getId())
                .name(income.getName())
                .amount(income.getAmount())
                .incomeDate(income.getIncomeDate())
                .userId(income.getUserId())
                .categoryResponse(categoryMapper.toCategoryResponse(income.getCategory()))
                .build();
    }
}
