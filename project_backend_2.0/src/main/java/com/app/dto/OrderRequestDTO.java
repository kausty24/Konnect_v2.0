package com.app.dto;

import com.app.entities.ServiceType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderRequestDTO {
	
	private String city;
	
	private ServiceType serviceType;
}
