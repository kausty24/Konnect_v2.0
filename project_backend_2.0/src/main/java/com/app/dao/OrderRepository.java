package com.app.dao;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Customer;
import com.app.entities.Order;
import com.app.entities.OrderStatus;
import com.app.entities.Service;
import com.app.entities.Vendor;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	public Set<Order> findByOrderStatusAndFinalVendorAndService(OrderStatus orderStatus, Vendor vendor, Service service);
	public Set<Order> findByOrderStatusAndServiceAndCustomerCity(OrderStatus orderStatus, Service service, String city);
	public Set<Order> findByFinalVendorAndOrderStatus(Vendor vendor, OrderStatus orderStatus);
	public Set<Order> findByCustomerAndOrderStatus(Customer customer, OrderStatus orderStatus);
	
	// adding method for temporary table creation
//	@Modifying
//	@Query(value = "CALL create_bid_table(?1)" , nativeQuery = true)
//	public int createTemporaryTable(String tableName);
//	
//	@Modifying
//	@Query(value = "DROP TABLE ?1" , nativeQuery = true)
//	public int dropTemporaryTable(String tableName);
//	
//	@Query(value = "SELECT COUNT(*) FROM ?1 WHERE vendor_id = ?2" , nativeQuery = true)
//	public long checkIfBidExists(String tempTableName, long vendorId);
//	
//	@Modifying
//	@Query(value = "insert into ?1 values(?2, ?3, ?4, ?5)" , nativeQuery = true)
//	public int addBid(String tempTableName, long vendorId, String vendorComments, LocalDateTime bidPlacedTime, double bidAmount);
//	
//	@Modifying
//	@Query(value = "update ?1 set vendor_comments = ?3, bid_placed_time = ?4, bid_amount = ?5 where vendor_id = ?2" , nativeQuery = true)
//	public int updateBid(String tempTableName, long vendorId, String vendorComments, LocalDateTime bidPlacedTime, Double bidAmount);
//	
//	@Modifying
//	@Query(value = "delete from ?1 where vendor_id = ?2" , nativeQuery = true)
//	public int deleteBid(String tempTableName, long vendorId);
}
