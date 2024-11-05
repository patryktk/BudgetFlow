package pl.tkaczyk.groupsservice.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tkaczyk.groupsservice.mapper.GroupMapper;
import pl.tkaczyk.groupsservice.model.Group;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;
import pl.tkaczyk.groupsservice.repository.GroupRepository;
import pl.tkaczyk.groupsservice.service.GroupService;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;

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
    public Boolean inviteToGroup(Long userId) {
        return null;
    }

    @Override
    public Boolean acceptInvitation(String token) {
        return null;
    }


}
