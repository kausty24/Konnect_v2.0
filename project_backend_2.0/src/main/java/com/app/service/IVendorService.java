package com.app.service;

import com.app.dto.FindContact; 
import com.app.dto.FindEmail;
import com.app.dto.LoginRequest;
import com.app.dto.VendorRegistrationDTO;
import com.app.dto.VendorUpdateDTO;
import com.app.entities.Vendor;

public interface IVendorService {
	public Vendor addNewVendor(VendorRegistrationDTO newVendor);
	public Vendor authenticateVendor(LoginRequest loginCredentials);
	public Vendor updateVendorDetail(VendorUpdateDTO updateDetails);
	public Vendor findEmailId(FindEmail emailId);
	public Vendor findContactNo(FindContact contactNo);
	public Vendor findByEmail(String email);
}
