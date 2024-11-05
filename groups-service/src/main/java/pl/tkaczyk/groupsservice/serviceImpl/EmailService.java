package pl.tkaczyk.groupsservice.serviceImpl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import pl.tkaczyk.groupsservice.model.enums.EmailTemplateName;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public void sendInvitationMail(String userEmail, EmailTemplateName emailTemplate, String invitationLinkWithToken) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        helper.setFrom("BudgetFlow@contact.com");
        helper.setTo(userEmail);

        Map<String, Object> properties = new HashMap<>();
        properties.put("userEmail", userEmail);
        properties.put("invitationLinkWithToken", invitationLinkWithToken);

        Context context = new Context();
        context.setVariables(properties);
        helper.setSubject(emailTemplate.getSubject());

        try {
            String template = templateEngine.process(emailTemplate.getTemplate(), context);
            helper.setText(template, true);

            mailSender.send(mimeMessage);
            log.info(String.format("Email sent to %s successfully", userEmail));
        } catch (MessagingException e) {
            log.warn("Email sent to {} failed", userEmail);
        }
    }
}
