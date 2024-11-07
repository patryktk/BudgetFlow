package pl.tkaczyk.groupsservice.mapper;

import org.springframework.stereotype.Service;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;
import pl.tkaczyk.groupsservice.model.dto.GroupResponseForExpenseService;

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
