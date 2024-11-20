package pl.tkaczyk.usersservice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.usersservice.model.dto.UserResponse;
import pl.tkaczyk.usersservice.service.UserService;

import java.util.List;

@RequestMapping("/users")
@RequiredArgsConstructor
@RestController
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/exist", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkIfUserExists(@RequestParam("email") String email) {
        boolean exists = userService.checkIfUserExistsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserResponse>> getUsers(@RequestBody List<Long> userIds) {
        return ResponseEntity.ok(userService.getDataUsers(userIds));
    }
}
