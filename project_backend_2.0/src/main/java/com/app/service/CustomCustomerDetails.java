package com.app.service;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.entities.Customer;
import com.app.entities.Vendor;

import lombok.ToString;

@ToString
public class CustomCustomerDetails implements UserDetails {
	private Customer customer;
	private Vendor vendor;

	public CustomCustomerDetails(Customer user, Vendor vendor) {
		super();
		this.customer = user;
		this.vendor = vendor;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Meaning : This method should ret Collection(List) of granted authorities ,
		// for a specific user --which will be later stored in Auth obj
		// SimpleGrantedAuthority(String roleName) imple GrantedAuthority
		// UserEntity ---> Role

//		return customer.getUserRoles() //Set<Role>
//		 .stream() //Stream<Role>
//		 .map(role -> new SimpleGrantedAuthority(role.getRoleName().name())) //Stream<SimpleGrantedAuthority>
//		 .collect(Collectors.toList());
		HashSet<GrantedAuthority> set = new HashSet<GrantedAuthority>();
		if (this.vendor == null) {
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					return "ROLE_CUSTOMER";
				}
			});
		} else {
			set.add(new GrantedAuthority() {

				@Override
				public String getAuthority() {
					return "ROLE_VENDOR";
				}
			});
		}

		return set;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		if (this.vendor == null)
			return customer.getPassword();
		return vendor.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		if (this.vendor == null)
			return customer.getEmail();
		return vendor.getEmail();

	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
