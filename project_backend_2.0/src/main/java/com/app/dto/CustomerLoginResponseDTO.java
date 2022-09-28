package com.app.dto;

import com.app.entities.Customer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CustomerLoginResponseDTO {
	private Customer customer;
	private String jwtToken;
	public CustomerLoginResponseDTO(Customer customer, String jwtToken) {
		super();
		this.customer = customer;
		this.jwtToken = jwtToken;
	}
}
