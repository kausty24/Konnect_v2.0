package com.app.dao;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Bid;
import com.app.entities.Order;
import com.app.entities.Vendor;

public interface BidRepository extends JpaRepository<Bid, Long> {
	public Optional<Bid> findByVendorAndOrder(Vendor vendor, Order order);
	public Set<Bid> findByOrder(Order order);
}
