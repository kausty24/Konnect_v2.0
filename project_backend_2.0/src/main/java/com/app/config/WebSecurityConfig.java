package com.app.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.filters.JWTRequestFilter;

@EnableWebSecurity // mandatory
@Configuration // mandatory
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JWTRequestFilter filter;

	// configure BCryptPassword encode bean
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(10);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).and().authorizeRequests()

				// for customers
				.antMatchers("/order/active/{customerId}", "/order/completed/{customerId}",
						"/order/pending/{customerId}")
				.hasRole("CUSTOMER")
				.antMatchers("/edit/customer", "/edit/customer/emailExist", "/edit/customer/contactExists")
				.hasRole("CUSTOMER")
				.antMatchers("/order/place", "/order/cancel/{orderId}", "/order/setcompleted", "/order/finalize")
				.hasRole("CUSTOMER")
//				.antMatchers("/order/getbiddetails/{orderId}", "/order/{orderId}")
//				.hasRole("CUSTOMER")

				// for vendors
				.antMatchers("/edit/vendor", "/edit/vendor/emailExist", "/edit/vendor/contactExists",
						"/order/completed")
				.hasRole("VENDOR")
				.antMatchers("/order/pending", "/order/request", "/order/placebid", "/order/deletebid")
				.hasRole("VENDOR")
//				.antMatchers("/order/getbiddetails/{orderId}", "/order/{orderId}")
//				.hasRole("VENDOR")

				// for unprotected routes
				.antMatchers("/reg/list", "/login/customer", "/login/vendor", "/reg/customer", "/reg/vendor",
						"/order/getbiddetails/{orderId}", "/order/{orderId}")
				.permitAll()

				// only required for JS clnts (react / angular)
				.antMatchers(HttpMethod.OPTIONS).permitAll().anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// configure auth mgr bean : to be used in Authentication REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
