package com.app.dto;

import java.util.Set;
import javax.validation.constraints.Email;

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
public class VendorUpdateDTO {
	private long vendorId;
	private String name;
	@Email
	private String email;
	private String contactNo;
	private String address;
	private String city;
	private String state;
	private String pincode;
	private Set<ServiceType> serviceEnums;	
}
