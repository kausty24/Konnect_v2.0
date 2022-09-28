package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CustomerResponseDTO {
	@NotBlank(message = "name is required")
	private String name;
	@Email
	@NotEmpty(message = "email is required")
	private String email;
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