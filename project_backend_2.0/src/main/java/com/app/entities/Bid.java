package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "vendor_id", "order_id" }) })
public class Bid extends BaseEntity {
	@OneToOne
	private Vendor vendor;
	@OneToOne
	private Order order;
	private String vendorComments;
	private LocalDateTime bidPlacedTime;
	private Double bidAmount;	
}
