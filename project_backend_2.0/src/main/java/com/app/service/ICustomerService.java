package com.app.service;

import com.app.dto.CustomerRegistrationDTO; 
import com.app.dto.CustomerUpdateDTO;
import com.app.dto.FindContact;
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.entities.Customer;

public interface ICustomerService {
	public Customer addNewCustomer(CustomerRegistrationDTO newCustomer);
	public Customer authenticateCustomer(LoginRequest loginCredentials);
	public Customer findEmailId(FindEmail emailId);
	public Customer findContactNo(FindContact contactNo);
	public Customer updateCustomerDetail(CustomerUpdateDTO updateDetails);
	public Customer findByEmail(String email);
}
