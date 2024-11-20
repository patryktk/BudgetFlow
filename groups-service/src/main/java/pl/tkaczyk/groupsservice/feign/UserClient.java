package pl.tkaczyk.groupsservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.groupsservice.model.dto.UserResponse;

import java.util.List;

@FeignClient(name = "users-service")
@Service
public interface UserClient {

    @GetMapping("/api/v1/users/exist")
    ResponseEntity<Boolean> userExists(@RequestParam("email") String email, @RequestHeader("Authorization") String authorizationHeader);

    @PostMapping("/api/v1/users/getUsers")
    ResponseEntity<List<UserResponse>> getUsers(@RequestBody List<Long> usersIds, @RequestHeader("Authorization") String authorizationHeader);
}
