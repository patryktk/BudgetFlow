package pl.tkaczyk.usersservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import pl.tkaczyk.usersservice.model.enums.EmailTemplateName;

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

    @Async
    public void sendActivationMail(String to, String username, EmailTemplateName emailTemplate, String confirmationUrl, String activationCode) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        helper.setFrom("BudgetFlow@contact.com");
        helper.setTo(to);

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmation_url", confirmationUrl);
        properties.put("activation_code", activationCode);

        Context context = new Context();
        context.setVariables(properties);
        helper.setSubject(emailTemplate.getSubject());

        try {
            String template = templateEngine.process(emailTemplate.getTemplate(), context);
            helper.setText(template, true);

            mailSender.send(mimeMessage);
            log.info(String.format("Email sent to %s successfully", to));
        } catch (MessagingException e) {
            log.warn("Email sent to {} failed", to);
        }
    }
}
