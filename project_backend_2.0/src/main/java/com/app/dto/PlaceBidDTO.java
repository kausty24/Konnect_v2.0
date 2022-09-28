package com.app.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PlaceBidDTO {
	private Long vendorId;
	private Long orderId;
	private Double bidAmount;
	private String vendorComments;
}
