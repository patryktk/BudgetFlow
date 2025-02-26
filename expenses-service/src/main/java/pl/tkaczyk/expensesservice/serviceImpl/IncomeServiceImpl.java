package pl.tkaczyk.expensesservice.serviceImpl;

import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.feign.GroupClient;
import pl.tkaczyk.expensesservice.mapper.StatisticsPartialMapper;
import pl.tkaczyk.expensesservice.mapper.IncomeMapper;
import pl.tkaczyk.expensesservice.model.Income;
import pl.tkaczyk.expensesservice.model.dto.*;
import pl.tkaczyk.expensesservice.repository.IncomeRepository;
import pl.tkaczyk.expensesservice.service.IncomeService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final IncomeMapper incomeMapper;
    private final GroupClient groupClient;
    private final StatisticsPartialMapper statisticsPartialMapper;

    @Override
    public IncomeResponse save(IncomeRequest incomeRequest, String userId) {
        Income income = incomeMapper.toIncome(incomeRequest);
        income.setUserId(Long.valueOf(userId));
        return incomeMapper.toIncomeResponse(incomeRepository.save(income));
    }

    @Override
    public IncomeResponse editIncome(IncomeRequest request) {
        Income incomeToEdit = incomeRepository.findById(request.id()).orElseThrow(() -> new NotFoundException("Income not found"));
        incomeToEdit.setName(request.name());
        incomeToEdit.setAmount(request.amount());
        incomeToEdit.setIncomeDate(request.incomeDate());
        return incomeMapper.toIncomeResponse(incomeRepository.save(incomeToEdit));
    }

    @Override
    public boolean deleteIncome(Long id) {
        incomeRepository.deleteById(id);
        return true;
    }

    @Override
    public List<IncomeResponse> getAllIncomeByUser(String userId) {
        return incomeRepository.findIncomesByUserId(Long.valueOf(userId))
                .stream()
                .map(incomeMapper::toIncomeResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<IncomeResponse> getIncomeByUserByMonth(String userId, StatisticsByMonthRequest request, Boolean inGroup) {
        if (inGroup) {
            ResponseEntity<GroupResponse> groupResponseResponseEntity = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId));
            if (groupResponseResponseEntity.getStatusCode().is2xxSuccessful() && groupResponseResponseEntity.getBody() != null && groupResponseResponseEntity.getBody().isInGroup()) {
                return incomeRepository.findIncomesByUsersIdAndMonth(groupResponseResponseEntity.getBody().users(),
                                LocalDate.parse(request.startDate()),
                                LocalDate.parse(request.endDate()))
                        .stream()
                        .map(incomeMapper::toIncomeResponse)
                        .collect(Collectors.toList());
            }
        }
        return incomeRepository.findIncomesByUserIdAndMonth(userId,
                        LocalDate.parse(request.startDate()),
                        LocalDate.parse(request.endDate()))
                .stream()
                .map(incomeMapper::toIncomeResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ResponseForStatistics> getIncomeStatisticByMonth(String userId, StatisticsByMonthRequest request) {
        GroupResponse groupResponse = groupClient.checkIfUserInAnyGroup(Long.valueOf(userId)).getBody();
        List<StatisticsPartialProjection> expensesStatistics;
        if (groupResponse.isInGroup()) {
            expensesStatistics = incomeRepository.findExpensesStatistics(LocalDate.parse(request.startDate())
                    , LocalDate.parse(request.endDate()),
                    groupResponse.users());

        } else {
            expensesStatistics = incomeRepository.findExpensesStatistics(LocalDate.parse(request.startDate())
                    , LocalDate.parse(request.endDate())
                    , Collections.singleton(Long.valueOf(userId)));
        }

        return expensesStatistics.stream().map(statisticsPartialMapper::toStatisticsResponse).collect(Collectors.toList());
    }
}
