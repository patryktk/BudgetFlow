package pl.tkaczyk.groupsservice.service;

import jakarta.mail.MessagingException;
import pl.tkaczyk.groupsservice.model.dto.GroupInviteRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;

public interface GroupService {
    GroupResponse getGroupByUserId(Long userId);

    GroupResponse createGroup(GroupRequest request);

    Boolean deleteGroup(Long groupId);

    void inviteToGroup(GroupInviteRequest request) throws MessagingException;

    Boolean acceptInvitation(String token, String userId);
}
