package pl.tkaczyk.usersservice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.tkaczyk.usersservice.service.UserService;

@RequestMapping("/users")
@RequiredArgsConstructor
@RestController
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    @GetMapping("/exist")
    public ResponseEntity<Boolean> checkIfUserExists(@RequestParam("email") String email) {
        boolean exists = userService.checkIfUserExistsByEmail(email);
        return ResponseEntity.ok(exists);
    }
}
