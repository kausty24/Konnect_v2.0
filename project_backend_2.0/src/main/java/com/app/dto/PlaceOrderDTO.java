package com.app.dto;

import java.time.LocalDateTime;

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
public class PlaceOrderDTO {
	private long customerId;
	private ServiceType serviceType;
	private int lockoutTimeInMinutes;
	private String customerComments;
	private double budget;	
}

