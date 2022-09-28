package com.app.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "vendors")
public class Vendor extends BaseEntity {
	@ManyToMany(fetch = FetchType.EAGER)
	private Set<Service> services;
	private String name;
	@Column(unique = true)
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	@Column(unique = true)
	private String contactNo;
	private String address;
	private String city;
	private String state;
	private String pincode;
	// add rating
	@Column(nullable = true)
	private Double rating;
	
	public void addService(ServiceType serv) {
		Service service = new Service();
		service.setServiceType(serv);
		services.add(service);
	}
}
