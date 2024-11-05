package pl.tkaczyk.groupsservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "users-service")
@Service
public interface UserClient {

    @GetMapping("/users/exist")
    Boolean userExists(@RequestParam("email") String email);
}
