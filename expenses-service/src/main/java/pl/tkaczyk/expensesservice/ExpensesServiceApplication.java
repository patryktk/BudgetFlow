package pl.tkaczyk.expensesservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients
@EnableJpaAuditing
public class ExpensesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpensesServiceApplication.class, args);
	}

}
