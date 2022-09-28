package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CustomerRepository;
import com.app.dao.VendorRepository;
import com.app.entities.Customer;
import com.app.entities.Vendor;

@Service // or @Component also works!
@Transactional

public class CustomCustomerDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
	@Autowired
	private CustomerRepository custRepo;

	@Autowired
	private VendorRepository vendorRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load by user nm " + email);
		// invoke dao's method to load user details from db by username(ie. actaully an
		// email)
		if(custRepo.findByEmail(email).isEmpty()) {
			Vendor vendor = vendorRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid Email id"));
			System.out.println("lifted user dtls from db " + vendor);
			return new CustomCustomerDetails(null,vendor);
		}
		Customer customer = custRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid Email id"));
		System.out.println("lifted user dtls from db " + customer);
		return new CustomCustomerDetails(customer,null);
	}

}
