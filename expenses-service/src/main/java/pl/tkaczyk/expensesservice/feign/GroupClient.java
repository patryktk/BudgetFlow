package pl.tkaczyk.expensesservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.tkaczyk.expensesservice.model.dto.GroupResponse;

@FeignClient(name = "groups-service")
public interface GroupClient {

    @GetMapping("/api/v1/groups/checkUserInGroup")
    ResponseEntity<GroupResponse> checkIfUserInAnyGroup(@RequestParam Long userId);
}
