package pl.tkaczyk.groupsservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;
import pl.tkaczyk.groupsservice.service.GroupService;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping()
    public ResponseEntity<GroupResponse> getGroup(@RequestParam Long userId){
        return ResponseEntity.ok().body(groupService.getGroupByUserId(userId));
    }

    @PostMapping()
    public ResponseEntity<GroupResponse> createGroup(@RequestBody GroupRequest request){
        return ResponseEntity.ok().body(groupService.createGroup(request));
    }

    @DeleteMapping()
    public ResponseEntity<Boolean> deleteGroup(@RequestParam Long groupId){
        return ResponseEntity.ok(groupService.deleteGroup(groupId));
    }

    public ResponseEntity<?> inviteToGroup(@RequestParam Long userId){
        return ResponseEntity.ok(groupService.inviteToGroup(userId));
    }

    public ResponseEntity<?> acceptInvitation(@RequestParam String token){
        return ResponseEntity.ok(groupService.acceptInvitation(token));
    }
}
