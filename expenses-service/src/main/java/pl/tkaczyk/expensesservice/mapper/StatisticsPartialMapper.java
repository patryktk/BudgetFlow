package pl.tkaczyk.expensesservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.expensesservice.model.dto.ResponseForStatistics;
import pl.tkaczyk.expensesservice.model.dto.StatisticsPartialProjection;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class StatisticsPartialMapper {

    public ResponseForStatistics toStatisticsResponse(StatisticsPartialProjection projection) {
        BigDecimal amount = BigDecimal.valueOf(projection.getAmount());
        Double averageValue = projection.getAverageValue() != null ? projection.getAverageValue() : 0.0;
        BigDecimal average = BigDecimal.valueOf(averageValue);
        BigDecimal roundedPercentage = BigDecimal.ZERO;
        if (average.compareTo(BigDecimal.ZERO) != 0) {
            BigDecimal percentage = amount.divide(average, 10, RoundingMode.HALF_UP).multiply(new BigDecimal(100));

            roundedPercentage = percentage.setScale(2, RoundingMode.HALF_UP);
        }

        return ResponseForStatistics.builder()
                .name(projection.getName())
                .amount(projection.getAmount())
                .averageValue(roundedPercentage.doubleValue())
                .build();
    }
}
