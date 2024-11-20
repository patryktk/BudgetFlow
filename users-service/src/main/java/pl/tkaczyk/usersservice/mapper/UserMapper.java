package pl.tkaczyk.usersservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.usersservice.model.User;
import pl.tkaczyk.usersservice.model.dto.UserResponse;

@Service
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
