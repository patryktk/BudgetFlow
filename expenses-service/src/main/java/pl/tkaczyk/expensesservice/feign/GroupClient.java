package pl.tkaczyk.expensesservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.tkaczyk.expensesservice.model.dto.GroupResponse;

@FeignClient(name = "groups-service")
@Service
public interface GroupClient {

    @GetMapping("/checkUserInGroup")
    GroupResponse checkIfUserInAnyGroup(@RequestParam Long userId);
}
