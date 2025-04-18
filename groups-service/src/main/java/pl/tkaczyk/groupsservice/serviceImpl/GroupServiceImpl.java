package pl.tkaczyk.groupsservice.serviceImpl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.tkaczyk.groupsservice.feign.UserClient;
import pl.tkaczyk.groupsservice.mapper.GroupMapper;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.Token;
import pl.tkaczyk.groupsservice.model.dto.*;
import pl.tkaczyk.groupsservice.model.enums.EmailTemplateName;
import pl.tkaczyk.groupsservice.repository.GroupRepository;
import pl.tkaczyk.groupsservice.repository.TokenRepository;
import pl.tkaczyk.groupsservice.service.GroupService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final UserClient userClient;
    @Value("${application.mailing.frontend.invitation-url}")
    private String invitationLink;

    @Override
    public GroupResponseWithUser getGroupByUserId(Long userId, String authorizationHeader) {
        Group group = groupRepository.getGroupByUsersContaining(userId).orElseThrow(() -> new IllegalStateException("Not found group"));
        List<UserResponse> usersData = userClient.getUsersData(new ArrayList<>(group.getUsers()), authorizationHeader).getBody();
        UserResponse ownerData = userClient.getUserData(group.getCreatedByUserId(), authorizationHeader).getBody();
        return groupMapper.toGroupResponseWithUser(group, usersData, ownerData);
    }

    @Override
    public GroupResponseWithUser createGroup(GroupRequest request, Long userId, String authorizationHeader) {
        if (groupRepository.getGroupByUsersContaining(userId).isPresent())
            throw new IllegalStateException("User is already in group");
        Group group = groupMapper.toGroup(request, userId);
        group.addUser(userId);
        List<UserResponse> usersData = userClient.getUsersData(new ArrayList<>(group.getUsers()), authorizationHeader).getBody();
        UserResponse ownerData = userClient.getUserData(userId, authorizationHeader).getBody();
        return groupMapper.toGroupResponseWithUser(groupRepository.save(group), usersData, ownerData);
    }

    @Override
    public Boolean deleteGroup(Long groupId) {
        tokenRepository.deleteByGroupId(groupId);
        groupRepository.deleteById(groupId);
        return true;
    }

    @Override
    public void inviteToGroup(GroupInviteRequest request, String authorizationHeader) throws MessagingException {
        var newToken = generateAndSaveInvitationToken(request);
        checkUserAndSendMail(request.userEmail(), newToken, authorizationHeader);
    }

    private void checkUserAndSendMail(String email, String newToken, String authorizationHeader) throws MessagingException {
        Boolean userExists = userClient.userExists(email, authorizationHeader).getBody();
        String invitationLinkWithToken = invitationLink + "?token=" + newToken;
        EmailTemplateName template = userExists ? EmailTemplateName.GROUP_INVITATION : EmailTemplateName.GROUP_INVITATION_NO_ACCOUNT;
        emailService.sendInvitationMail(email, template, invitationLinkWithToken);
    }

    private String generateAndSaveInvitationToken(GroupInviteRequest groupInviteRequest) {
        var generatedToken = generateActivationToken(6);
        Group group = groupRepository.findById(groupInviteRequest.groupId()).orElseThrow(() -> new IllegalStateException("Group not found"));
        var invitationToken = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(60))
                .group(group)
                .invitedUserEmail(groupInviteRequest.userEmail())
                .build();
        tokenRepository.save(invitationToken);
        return generatedToken;
    }

    private String generateActivationToken(int length) {
        return UUID.randomUUID().toString().replace("-", "").substring(0, length);
    }

    @Override
    public Token verifyInvToken(String token) {
        return tokenRepository.findByToken(token).filter(invitation -> invitation.getExpiresAt().isBefore(LocalDateTime.now()) || invitation.getValidatedAt() == null)
                .orElse(null);
    }

    @Override
    public Boolean acceptInvitation(String token, String userId) {
        var savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new IllegalStateException("Token not found"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt()) || savedToken.getValidatedAt() != null) {
            return false;
        }
        savedToken.setValidatedAt(LocalDateTime.now());
        Group group = savedToken.getGroup();
        group.addUser(Long.valueOf(userId));
        groupRepository.save(group);
        return true;
    }

    @Override
    public GroupResponseForExpenseService checkUserIsInAnyGroup(Long userId) {
        Optional<Group> optionalGroup = groupRepository.getGroupByUsersContaining(userId);
        if (optionalGroup.isEmpty()) {
            return GroupResponseForExpenseService.builder().isInGroup(false).build();
        }
        return groupMapper.toGroupResponseExpense(optionalGroup.get());
    }
}
