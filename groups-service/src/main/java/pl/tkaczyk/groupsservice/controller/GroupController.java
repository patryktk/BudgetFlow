package pl.tkaczyk.groupsservice.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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
@Tag(name = "Group")
public class GroupController {

    private final GroupService groupService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GroupResponse> getGroup(@Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok().body(groupService.getGroupByUserId(Long.parseLong(userId)));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GroupResponse> createGroup(@RequestBody GroupRequest request,
                                                     @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok().body(groupService.createGroup(request, Long.valueOf(userId)));
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteGroup(@RequestParam Long groupId){
        return ResponseEntity.ok(groupService.deleteGroup(groupId));
    }

    @PostMapping(value = "/sendInvitation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> inviteToGroup(@RequestBody GroupInviteRequest request,
                                           @Parameter(hidden = true) @RequestHeader("Authorization") String authorizationHeader) throws MessagingException {
        groupService.inviteToGroup(request, authorizationHeader);
        return ResponseEntity.accepted().build();
    }

    @GetMapping(value = "/acceptInvitation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> acceptInvitation(@RequestParam String token,
                                              @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId) {
        Boolean accepted = groupService.acceptInvitation(token, userId);
        if(accepted){
            return ResponseEntity.ok().body("Invitation accepted");
        }
        return ResponseEntity.ok().body("Invitation error.");
    }

    @GetMapping(value = "/checkUserInGroup", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GroupResponseForExpenseService> checkUserIsInAnyGroup(@RequestParam Long userId){
        return ResponseEntity.ok(groupService.checkUserIsInAnyGroup(userId));
    }
}
