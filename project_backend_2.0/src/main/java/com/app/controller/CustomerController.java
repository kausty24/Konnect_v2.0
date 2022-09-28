package com.app.controller;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerLoginResponseDTO;
import com.app.dto.CustomerRegistrationDTO;
import com.app.dto.CustomerUpdateDTO;
import com.app.dto.FindContact;
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.entities.Customer;
import com.app.entities.Order;
import com.app.entities.OrderStatusType;
import com.app.jwt_utils.JwtUtils;
import com.app.service.ICustomerService;
import com.app.service.IOrderService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Validated
@Slf4j
public class CustomerController {
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private ICustomerService custService;
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private IOrderService orderService;

	@PostMapping("/reg/customer")
	public ResponseEntity<?> registerCustomer(@RequestBody @Valid CustomerRegistrationDTO customerDetails) {
		return new ResponseEntity<>(custService.addNewCustomer(customerDetails), HttpStatus.CREATED);
	}

	@PostMapping("/edit/customer")
	public ResponseEntity<?> updateCustomer(@RequestBody @Valid CustomerUpdateDTO updateDetails) {
		return new ResponseEntity<>(custService.updateCustomerDetail(updateDetails), HttpStatus.CREATED);
	}

	@PostMapping("/login/customer")
	public ResponseEntity<?> loginCustomer(@RequestBody @Valid LoginRequest loginCredentials) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				loginCredentials.getEmail(), loginCredentials.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			Customer customer = custService.findByEmail(loginCredentials.getEmail());
			// => auth succcess
			return ResponseEntity
					.ok(new CustomerLoginResponseDTO(customer, utils.generateJwtToken(authenticatedDetails)));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@PostMapping("/edit/customer/emailExist")
	public ResponseEntity<?> searchEmail(@RequestBody @Valid FindEmail emailId) {
		return new ResponseEntity<>(custService.findEmailId(emailId), HttpStatus.OK);
	}

	@PostMapping("/edit/customer/contactExists")
	public ResponseEntity<?> searchContact(@RequestBody @Valid FindContact contactNo) {
		return new ResponseEntity<>(custService.findContactNo(contactNo), HttpStatus.OK);
	}

	@GetMapping("/order/active/{customerId}")
	public ResponseEntity<?> findActiveOrdersByCustomer(@PathVariable long customerId) {
		Set<Order> orders = orderService.findOrdersByCustomerAndStatus(customerId, OrderStatusType.NEW);
		orders.addAll(orderService.findOrdersByCustomerAndStatus(customerId, OrderStatusType.BIDDING_OVER));
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}

	@GetMapping("/order/pending/{customerId}")
	public ResponseEntity<?> findPendingOrdersByCustomer(@PathVariable long customerId) {
		return new ResponseEntity<>(orderService.findOrdersByCustomerAndStatus(customerId, OrderStatusType.PENDING),
				HttpStatus.OK);
	}

	@GetMapping("/order/completed/{customerId}")
	public ResponseEntity<?> findCompletedOrdersByCustomer(@PathVariable long customerId) {
		return new ResponseEntity<>(orderService.findOrdersByCustomerAndStatus(customerId, OrderStatusType.COMPLETED),
				HttpStatus.OK);
	}
}
