package pl.tkaczyk.groupsservice.controller;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.tkaczyk.groupsservice.model.dto.GroupInviteRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupRequest;
import pl.tkaczyk.groupsservice.model.dto.GroupResponse;
import pl.tkaczyk.groupsservice.model.dto.GroupResponseForExpenseService;
import pl.tkaczyk.groupsservice.service.GroupService;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping()
    public ResponseEntity<GroupResponse> getGroup(@RequestHeader("X-User-Id") String userId){
        return ResponseEntity.ok().body(groupService.getGroupByUserId(Long.parseLong(userId)));
    }

    @PostMapping()
    public ResponseEntity<GroupResponse> createGroup(@RequestBody GroupRequest request, @RequestHeader("X-User-Id") String userId){
        return ResponseEntity.ok().body(groupService.createGroup(request, Long.valueOf(userId)));
    }

    @DeleteMapping()
    public ResponseEntity<Boolean> deleteGroup(@RequestParam Long groupId){
        return ResponseEntity.ok(groupService.deleteGroup(groupId));
    }

    @PostMapping("/sendInvitation")
    public ResponseEntity<?> inviteToGroup(@RequestBody GroupInviteRequest request,  @RequestHeader("Authorization") String authorizationHeader) throws MessagingException {
        groupService.inviteToGroup(request, authorizationHeader);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/acceptInvitation")
    public ResponseEntity<?> acceptInvitation(@RequestParam String token, @RequestHeader("X-User-Id") String userId){
        Boolean accepted = groupService.acceptInvitation(token, userId);
        if(accepted){
            return ResponseEntity.ok().body("Invitation accepted");
        }
        return ResponseEntity.ok().body("Invitation error.");
    }

    @GetMapping("/checkUserInGroup")
    public ResponseEntity<GroupResponseForExpenseService> checkUserIsInAnyGroup(@RequestParam Long userId){
        return ResponseEntity.ok(groupService.checkUserIsInAnyGroup(userId));
    }
}
