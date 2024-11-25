package pl.tkaczyk.usersservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.usersservice.mapper.UserMapper;
import pl.tkaczyk.usersservice.model.User;
import pl.tkaczyk.usersservice.model.dto.UserResponse;
import pl.tkaczyk.usersservice.repository.UserRepository;
import pl.tkaczyk.usersservice.service.UserService;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public boolean checkIfUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public List<UserResponse> getDataUsers(List<Long> userIds) {
        return userRepository.findAllById(userIds).stream().map(userMapper::toUserResponse).collect(Collectors.toList());
    }

    @Override
    public UserResponse getDataUser(long userId) {
        return userRepository.findById(userId).map(userMapper::toUserResponse).orElseThrow(() -> new IllegalStateException("Brak takiego user'a"));
    }
}
