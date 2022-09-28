package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
	public Optional<Vendor> findByEmailAndPassword(String email, String password);
	public Optional<Vendor> findByEmail(String emailId);
	public Optional<Vendor> findByContactNo(String contactNo);
}
