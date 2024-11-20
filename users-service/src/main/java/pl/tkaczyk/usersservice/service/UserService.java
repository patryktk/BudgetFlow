package pl.tkaczyk.usersservice.service;

import pl.tkaczyk.usersservice.model.User;
import pl.tkaczyk.usersservice.model.dto.UserResponse;

import java.util.List;

public interface UserService {
    boolean checkIfUserExistsByEmail(String email);

    List<UserResponse> getDataUsers(List<Long> userIds);
}
