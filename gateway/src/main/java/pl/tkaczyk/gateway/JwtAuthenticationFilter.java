package pl.tkaczyk.gateway;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory {

    private final WebClient.Builder webClientBuilder;


    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (authHeader != null && !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
            return webClientBuilder.build()
                    .get()
                    .uri("http://USERS-SERVICE/api/v1/users/auth/validateToken")
                    .header("Authorization", authHeader)
                    .retrieve()
                    .onStatus(HttpStatusCode::is4xxClientError,
                            clientResponse -> Mono.error(new RuntimeException("Token nieprawidłowy lub wygasł")))
                    .bodyToMono(String.class)
                    .flatMap(userId -> {
                        exchange.getRequest().mutate()
                                .header("X-User-id", userId)
                                .build();
                        return chain.filter(exchange);
                    });
        };
    }



    public static class Config {
    }
}
