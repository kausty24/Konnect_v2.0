package com.app.dto;

import com.app.entities.Customer;
import com.app.entities.Vendor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class VendorLoginResponseDTO {
	private Vendor vendor;
	private String jwtToken;
	public VendorLoginResponseDTO(Vendor vendor, String jwtToken) {
		super();
		this.vendor = vendor;
		this.jwtToken = jwtToken;
	}
}
