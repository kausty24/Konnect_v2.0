package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.CustomerRepository;
import com.app.dto.CustomerRegistrationDTO;
import com.app.dto.CustomerUpdateDTO;
import com.app.dto.FindContact;
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.entities.Customer;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService{

	@Autowired
	private CustomerRepository custRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public Customer addNewCustomer(CustomerRegistrationDTO newCustomer) {
		Customer transientCustomer = mapper.map(newCustomer, Customer.class);
		transientCustomer.setPassword(encoder.encode(newCustomer.getPassword()));
		Customer persistentCustomer = custRepo.save(transientCustomer);
		return persistentCustomer;
	}

	@Override
	public Customer authenticateCustomer(LoginRequest loginCredentials) {
		return custRepo.findByEmailAndPassword(loginCredentials.getEmail(), loginCredentials.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
	}

	@Override
	public Customer updateCustomerDetail(CustomerUpdateDTO updateDetails) {
		Customer originalCustomer = custRepo.findById(updateDetails.getCustomerId()).orElseThrow(() -> new ResourceNotFoundException("customer not found"));
		originalCustomer.setEmail(updateDetails.getEmail());
		originalCustomer.setAddress(updateDetails.getAddress());
		originalCustomer.setCity(updateDetails.getCity());
		originalCustomer.setContactNo(updateDetails.getContactNo());
		originalCustomer.setName(updateDetails.getName());
		originalCustomer.setPincode(updateDetails.getPincode());
		originalCustomer.setState(updateDetails.getState());
		Customer persistentCustomer = custRepo.save(originalCustomer);
		return persistentCustomer;
	}
	
	@Override
	public Customer findEmailId(FindEmail emailId) {
		return custRepo.findByEmail(emailId.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("Email not found"));
	}

	@Override
	public Customer findContactNo(FindContact contactNo) {
		return custRepo.findByContactNo(contactNo.getContactNo())
				.orElseThrow(() -> new ResourceNotFoundException("Contact not found")); 
	}

	@Override
	public Customer findByEmail(String email) {
		return custRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Customer not found!"));
	}	
}
