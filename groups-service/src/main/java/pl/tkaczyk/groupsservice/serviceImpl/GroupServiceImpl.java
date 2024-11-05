package pl.tkaczyk.groupsservice.serviceImpl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.tkaczyk.groupsservice.feign.UserClient;
import pl.tkaczyk.groupsservice.mapper.GroupMapper;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.Token;
import pl.tkaczyk.groupsservice.model.dto.GroupInviteRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;
import pl.tkaczyk.groupsservice.model.enums.EmailTemplateName;
import pl.tkaczyk.groupsservice.repository.GroupRepository;
import pl.tkaczyk.groupsservice.repository.TokenRepository;
import pl.tkaczyk.groupsservice.service.GroupService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final UserClient userClient;
    @Value("${application.mailing.frontend.invitation-link}")
    private String invitationLink;

    @Override
    public GroupResponse getGroupByUserId(Long userId) {
        return groupMapper.toGroupResponse(groupRepository.getGroupByUsersContaining(userId).orElseThrow(() -> new IllegalStateException("Not found group")));
    }

    @Override
    public GroupResponse createGroup(GroupRequest request) {
        Group group = groupMapper.toGroup(request);
        group.addUser(request.createdByUserId());
        return groupMapper.toGroupResponse(groupRepository.save(group));
    }

    @Override
    public Boolean deleteGroup(Long groupId) {
        groupRepository.deleteById(groupId);
        return true;
    }

    @Override
    public Boolean inviteToGroup(GroupInviteRequest request) throws MessagingException {
        //TODO: Sprawdzić czy user jest juz w grupie
        var newToken = generateAndSaveInvitationToken(request);
        //TODO: Sprawdzić czy ma konto założone na tego maila
        Boolean userExists = userClient.userExists(request.userEmail());
        //TODO: Wysłać maila z zaproszeniem do grupy w zależności czy ma konto czy nie, to inną templatke wysłać
        String invitationLinkWithToken = invitationLink + "?token=" + newToken;
        EmailTemplateName template = userExists ? EmailTemplateName.GROUP_INVITATION : EmailTemplateName.GROUP_INVITATION_NO_ACCOUNT;
        emailService.sendInvitationMail(request.userEmail(), template, invitationLinkWithToken);
        return null;
    }

    private String generateAndSaveInvitationToken(GroupInviteRequest request) {
        var generatedToken = generateActivationToken(6);
        Group group = groupRepository.findById(request.groupId()).orElseThrow(() -> new IllegalStateException("Group not found"));
        var invitationToken = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .group(group)
                .build();
        tokenRepository.save(invitationToken);
        return generatedToken;
    }

    private String generateActivationToken(int length) {
        return UUID.randomUUID().toString().replace("-", "").substring(0, length);
    }

    @Override
    public Boolean acceptInvitation(String token) {
        return null;
    }


}
