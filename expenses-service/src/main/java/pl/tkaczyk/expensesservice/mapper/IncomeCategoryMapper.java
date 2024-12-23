package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.IncomeCategory;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeCategoryResponse;

@Service
public class IncomeCategoryMapper {

    public IncomeCategory toIncomeCategory(IncomeCategoryRequest request, String activeUserId) {
        return IncomeCategory.builder()
                .id(request.id())
                .name(request.name())
                .createdByUserId(Long.valueOf(activeUserId))
                .build();
    }

    public IncomeCategoryResponse toIncomeCategoryResponse(IncomeCategory incomeCategory) {
        return IncomeCategoryResponse.builder()
                .id(incomeCategory.getId())
                .name(incomeCategory.getName())
                .createdByUserId(incomeCategory.getCreatedByUserId())
                .build();
    }
}
