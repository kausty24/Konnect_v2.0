package com.app.service;

import java.util.Set; 
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.ServiceRepository;
import com.app.dao.VendorRepository;
import com.app.dto.FindContact;
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.dto.VendorRegistrationDTO;
import com.app.dto.VendorUpdateDTO;
import com.app.entities.Vendor;

@Service
@Transactional
public class VendorServiceImpl implements IVendorService {

	@Autowired
	private VendorRepository vendorRepo;
	
	@Autowired
	private ServiceRepository serviceRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public Vendor addNewVendor(VendorRegistrationDTO newVendor) {
		Vendor transientVendor = mapper.map(newVendor, Vendor.class);
		transientVendor.setPassword(encoder.encode(newVendor.getPassword()));
		// to add services manually
		Set<com.app.entities.Service> services = newVendor.getServiceEnums().stream()
				.map(e->serviceRepo.findByServiceType(e).orElseThrow(()->new com.app.custom_exception.ResourceNotFoundException("No Service Found")))
				.collect(Collectors.toSet());
		transientVendor.setServices(services);
		transientVendor.setRating(3.0); // default rating
		Vendor persistentVendor = vendorRepo.save(transientVendor);
		return persistentVendor;
	}

	@Override
	public Vendor authenticateVendor(LoginRequest loginCredentials) {
		return vendorRepo.findByEmailAndPassword(loginCredentials.getEmail(), loginCredentials.getPassword()).orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
	}

	@Override
	public Vendor updateVendorDetail(VendorUpdateDTO updateDetails) {
		Vendor originalVendor = vendorRepo.findById(updateDetails.getVendorId()).orElseThrow(() -> new ResourceNotFoundException("customer not found"));
		originalVendor.setEmail(updateDetails.getEmail());
		originalVendor.setAddress(updateDetails.getAddress());
		originalVendor.setCity(updateDetails.getCity());
		originalVendor.setContactNo(updateDetails.getContactNo());
		originalVendor.setName(updateDetails.getName());
		originalVendor.setPincode(updateDetails.getPincode());
		originalVendor.setState(updateDetails.getState());
		
		Set<com.app.entities.Service> services = updateDetails.getServiceEnums().stream()
				.map(e->serviceRepo.findByServiceType(e).orElseThrow(()->new com.app.custom_exception.ResourceNotFoundException("No Service Found")))
				.collect(Collectors.toSet());
		originalVendor.setServices(services);
		
		Vendor persistentVendor = vendorRepo.save(originalVendor);
		return persistentVendor;
	}
	
	@Override
	public Vendor findEmailId(FindEmail emailId) {
		return vendorRepo.findByEmail(emailId.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("Email not found"));
	}

	@Override
	public Vendor findContactNo(FindContact contactNo) {
		return vendorRepo.findByContactNo(contactNo.getContactNo())
				.orElseThrow(() -> new ResourceNotFoundException("Contact not found")); 
	}

	@Override
	public Vendor findByEmail(String email) {
		return vendorRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Email not found"));
	}	

}
