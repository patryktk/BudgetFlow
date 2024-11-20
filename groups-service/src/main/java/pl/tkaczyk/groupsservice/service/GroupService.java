package pl.tkaczyk.groupsservice.service;

import jakarta.mail.MessagingException;
import pl.tkaczyk.groupsservice.model.dto.*;

public interface GroupService {
    GroupResponseWithUser getGroupByUserId(Long userId, String authorizationHeader);

    GroupResponseWithUser createGroup(GroupRequest request, Long userId, String authorizationHeader);

    Boolean deleteGroup(Long groupId);

    void inviteToGroup(GroupInviteRequest request, String authorizationHeader) throws MessagingException;

    Boolean acceptInvitation(String token, String userId);

    GroupResponseForExpenseService checkUserIsInAnyGroup(Long userId);
}
