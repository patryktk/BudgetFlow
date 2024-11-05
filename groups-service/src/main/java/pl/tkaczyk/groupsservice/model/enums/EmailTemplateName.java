package pl.tkaczyk.groupsservice.model.enums;

import lombok.Getter;

public enum EmailTemplateName {
    GROUP_INVITATION("group_invitation.html", "Invitation to group in BudgetFlow"),
    GROUP_INVITATION_NO_ACCOUNT("group_invitation_no_account.html", "Invitation to BudgetFlow and group")
    ;

    @Getter
    private final String template;
    @Getter
    private final String subject;

    EmailTemplateName(String template, String subject) {
        this.template = template;
        this.subject = subject;
    }
}
