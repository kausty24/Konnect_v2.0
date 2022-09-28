package com.app.dto;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import com.app.entities.Service;
import com.app.entities.ServiceType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class VendorRegistrationDTO {
	@NotEmpty(message = "services need to be present")
	private Set<ServiceType> serviceEnums;
	@NotBlank(message = "name is required")
	private String name;
	@Email
	@NotEmpty(message = "email is required")
	private String email;
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or Invalid password")
	private String password;
	@NotEmpty(message = "Contact Number is required")
	private String contactNo;
	@NotEmpty(message = "Address is required")
	private String address;
	@NotEmpty(message = "City is required")
	private String city;
	@NotEmpty(message = "State is required")
	private String state;
	@NotEmpty(message = "Pincode is required")
	private String pincode;
}
