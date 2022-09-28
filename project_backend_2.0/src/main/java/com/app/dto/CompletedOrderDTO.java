package com.app.dto;

import com.app.entities.ServiceType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString

public class CompletedOrderDTO {
	
	private long vendorId;
	
	private ServiceType serviceType;
}
