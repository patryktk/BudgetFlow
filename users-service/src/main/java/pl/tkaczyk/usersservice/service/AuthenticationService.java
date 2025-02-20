package pl.tkaczyk.usersservice.service;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.tkaczyk.usersservice.model.Token;
import pl.tkaczyk.usersservice.model.User;
import pl.tkaczyk.usersservice.model.dto.AuthenticationRequest;
import pl.tkaczyk.usersservice.model.dto.AuthenticationResponse;
import pl.tkaczyk.usersservice.model.dto.RegistrationRequest;
import pl.tkaczyk.usersservice.model.enums.EmailTemplateName;
import pl.tkaczyk.usersservice.repository.RoleRepository;
import pl.tkaczyk.usersservice.repository.TokenRepository;
import pl.tkaczyk.usersservice.repository.UserRepository;
import pl.tkaczyk.usersservice.security.JwtService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {


    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(@Valid RegistrationRequest registrationRequest) throws MessagingException {
        var userRole = roleRepository.findByName("USER").orElseThrow(() -> new IllegalStateException("Role USER was not initialized"));

        var user = User.builder()
                .firstName(registrationRequest.firstname())
                .lastName(registrationRequest.lastname())
                .email(registrationRequest.email())
                .password(passwordEncoder.encode(registrationRequest.password()))
                .accountLocked(false)
                .active(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveAuthenticationToken(user);
        emailService.sendActivationMail(user.getEmail(), user.getFullName(), EmailTemplateName.ACTIVATE_ACCOUNT, activationUrl, newToken);
    }

    private String generateAndSaveAuthenticationToken(User user) {
        var generatedToken = generateActivationToken(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationToken(int length) {
        return UUID.randomUUID().toString().replace("-", "").substring(0, length);
    }

    public AuthenticationResponse authenticate(@Valid AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        claims.put("fullName", user.getFullName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    public void activateAccount(String token) throws MessagingException {
        var savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new IllegalStateException("Token not found"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Token is expired. A new token has benn send to the same email address");
        }
        var user = userRepository.findByEmail(savedToken.getUser().getEmail()).orElseThrow(() -> new IllegalStateException("User not found"));
        user.setActive(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    public boolean validateToken(String token, Authentication authentication) {
        var user = (User) authentication.getPrincipal();
        if (token.startsWith("Bearer")) {
            token = token.substring(7);
        }
        return jwtService.isTokenValid(token, user);
    }
}
