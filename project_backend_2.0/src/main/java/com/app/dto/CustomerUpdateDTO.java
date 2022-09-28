package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CustomerUpdateDTO {
	private long customerId;
	private String name;
	@Email
	private String email;
	private String contactNo;
	private String address;
	private String city;
	private String state;
	private String pincode;
}
