package com.app.controller;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerLoginResponseDTO;
import com.app.dto.FindContact;
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.dto.VendorLoginResponseDTO;
import com.app.dto.VendorRegistrationDTO;
import com.app.dto.VendorUpdateDTO;
import com.app.entities.Customer;
import com.app.entities.ServiceType;
import com.app.entities.Vendor;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IVendorService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@Validated
public class VendorController {
	@Autowired
	private JwtUtils utils;
	@Autowired
	private IVendorService vendorService;
	@Autowired
	private AuthenticationManager manager;
	@Autowired
	private PasswordEncoder encoder;
	
	@PostMapping("/reg/vendor")
	public ResponseEntity<?> registerVendor(@RequestBody @Valid VendorRegistrationDTO vendorDetails) {
		return new ResponseEntity<>(vendorService.addNewVendor(vendorDetails), HttpStatus.CREATED);
	}
	
	@GetMapping("/reg/list")
	public ResponseEntity<?> getAllServices() {
		return new ResponseEntity<>(ServiceType.values(), HttpStatus.OK);
	}
	
	@PostMapping("/login/vendor")
	public ResponseEntity<?> loginCustomer(@RequestBody @Valid LoginRequest loginCredentials) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
				loginCredentials.getEmail(), loginCredentials.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			Vendor vendor = vendorService.findByEmail(loginCredentials.getEmail());
			// => auth succcess
			return ResponseEntity
					.ok(new VendorLoginResponseDTO(vendor, utils.generateJwtToken(authenticatedDetails)));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
	@PostMapping("/edit/vendor")
	public ResponseEntity<?> updateVendor(@RequestBody @Valid VendorUpdateDTO updateDetails){
		return new ResponseEntity<>(vendorService.updateVendorDetail(updateDetails),HttpStatus.OK);
	}
	
	@PostMapping("/edit/vendor/emailExist")
	public ResponseEntity<?> searchEmail(@RequestBody @Valid FindEmail emailId){
		return new ResponseEntity<>(vendorService.findEmailId(emailId),HttpStatus.OK);
	}
	
	@PostMapping("/edit/vendor/contactExists")
	public ResponseEntity<?> searchContact(@RequestBody @Valid FindContact contactNo){
		return new ResponseEntity<>(vendorService.findContactNo(contactNo),HttpStatus.OK);
	}
}
