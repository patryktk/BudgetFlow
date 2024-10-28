package pl.tkaczyk.usersservice.model.enums;

import lombok.Getter;

public enum EmailTemplateName {
    ACTIVATE_ACCOUNT("activate_account.html", "Activation token")
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
