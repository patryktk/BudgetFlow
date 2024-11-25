package pl.tkaczyk.groupsservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.dto.*;

import java.util.List;

@Service
public class GroupMapper {

    public GroupResponse toGroupResponse(Group group) {
        return GroupResponse.builder()
                .id(group.getId())
                .name(group.getName())
                .description(group.getDescription())
                .createdByUserId(group.getCreatedByUserId())
                .users(group.getUsers())
                .build();
    }

    public GroupResponseWithUser toGroupResponseWithUser(Group group, List<UserResponse> usersData, UserResponse ownerData) {
        return GroupResponseWithUser.builder()
                .id(group.getId())
                .name(group.getName())
                .description(group.getDescription())
                .createdByUser(ownerData)
                .usersData(usersData)
                .build();
    }

    public Group toGroup(GroupRequest request, Long userId) {
        return Group.builder()
                .name(request.name())
                .description(request.description())
                .createdByUserId(userId)
                .build();
    }

    public GroupResponseForExpenseService toGroupResponseExpense(Group group) {
        return GroupResponseForExpenseService.builder()
                .groupId(group.getId())
                .isInGroup(true)
                .users(group.getUsers())
                .build();
    }
}
