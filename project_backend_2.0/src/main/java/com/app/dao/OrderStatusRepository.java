package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OrderStatus;
import com.app.entities.OrderStatusType;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long>{
	
	public OrderStatus findByOrderStatusType(OrderStatusType orderStatusType);
}
