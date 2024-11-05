package pl.tkaczyk.groupsservice.service;

import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;

public interface GroupService {
    GroupResponse getGroupByUserId(Long userId);

    GroupResponse createGroup(GroupRequest request);

    Boolean deleteGroup(Long groupId);

    Boolean inviteToGroup(Long userId);

    Boolean acceptInvitation(String token);
}
