package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Service;
import com.app.entities.ServiceType;

public interface ServiceRepository extends JpaRepository<Service, Long> {
	public Optional<Service> findByServiceType(ServiceType serviceType);
}
