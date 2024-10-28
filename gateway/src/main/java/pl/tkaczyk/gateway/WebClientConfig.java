package pl.tkaczyk.gateway;

import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced // umożliwia korzystanie z nazw usług zarejestrowanych w Eurece
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
