package pl.tkaczyk.groupsservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "users-service")
@Service
public interface UserClient {

    @GetMapping("/api/v1/users/exist")
    ResponseEntity<Boolean> userExists(@RequestParam("email") String email, @RequestHeader("Authorization") String authorizationHeader);
}
