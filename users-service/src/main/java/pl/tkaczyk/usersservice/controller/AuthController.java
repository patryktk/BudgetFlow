package pl.tkaczyk.usersservice.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.usersservice.model.User;
import pl.tkaczyk.usersservice.model.dto.AuthenticationRequest;
import pl.tkaczyk.usersservice.model.dto.AuthenticationResponse;
import pl.tkaczyk.usersservice.model.dto.RegistrationRequest;
import pl.tkaczyk.usersservice.service.AuthenticationService;

@RequestMapping("/users/auth")
@RequiredArgsConstructor
@RestController
@Tag(name = "Authentication")
public class AuthController {

    private final AuthenticationService authenticationService;

    @GetMapping(value = "/test")
    public String xd(){
        System.out.println("NGAg");
        return "test";
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest registrationRequest) throws MessagingException {
        authenticationService.register(registrationRequest);
        return ResponseEntity.accepted().build();
    }

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok().body(authenticationService.authenticate(request));
    }

    @GetMapping(value = "/activate-account", produces = MediaType.APPLICATION_JSON_VALUE)
    public void confirm(@RequestParam String token) throws MessagingException {
        authenticationService.activateAccount(token);
    }

    @GetMapping(value = "/validateToken", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String token, Authentication authentication) {
        boolean isTokenValid = authenticationService.validateToken(token, authentication);
        var user = (User) authentication.getPrincipal();
        if (isTokenValid) {
            return ResponseEntity.ok(String.valueOf(user.getId()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is not valid");
    }


}
