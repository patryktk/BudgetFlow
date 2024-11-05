package pl.tkaczyk.usersservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.usersservice.repository.UserRepository;
import pl.tkaczyk.usersservice.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean checkIfUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
