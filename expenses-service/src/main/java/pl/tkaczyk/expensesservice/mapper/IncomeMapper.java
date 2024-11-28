package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.IncomeRequest;
import pl.tkaczyk.expensesservice.model.dto.IncomeResponse;

@Service
public class IncomeMapper {

    public Income toIncome(IncomeRequest request){
        return Income.builder()
                .id(request.id())
                .name(request.name())
                .amount(request.amount())
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
                .build();
    }
}
