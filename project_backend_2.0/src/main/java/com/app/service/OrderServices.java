package com.app.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SpringBootEmail.Entity.EmailDetails;
import com.SpringBootEmail.Entity.EmailHelper;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BidRepository;
import com.app.dao.CustomerRepository;
import com.app.dao.OrderRepository;
import com.app.dao.OrderStatusRepository;
import com.app.dao.ServiceRepository;
import com.app.dao.VendorRepository;
import com.app.dto.CompletedOrderDTO;
import com.app.dto.DeleteBidDTO;
import com.app.dto.OrderRequestDTO;
import com.app.dto.PlaceBidDTO;
import com.app.dto.PlaceOrderDTO;
import com.app.entities.Bid;
import com.app.entities.Order;
import com.app.entities.OrderStatus;
import com.app.entities.OrderStatusType;
import com.app.entities.Vendor;
import com.razorpay.*;

@Service
@Transactional
public class OrderServices implements IOrderService {

	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private CustomerRepository custRepo;
	@Autowired
	private ServiceRepository serviceRepo;
	@Autowired
	private OrderStatusRepository orderStatusRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private BidRepository bidRepo;
	@Autowired
	private EmailService emailService;
	@Autowired
	private ModelMapper mapper;

	@Override
	public Order placeOrder(@Valid PlaceOrderDTO orderDetails) {
		Order transientOrder = mapper.map(orderDetails, Order.class);
		transientOrder.setCustomer(custRepo.findById(orderDetails.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("Customer Not Found")));
		transientOrder.setService(serviceRepo.findByServiceType(orderDetails.getServiceType())
				.orElseThrow(() -> new ResourceNotFoundException("Service Not Found")));
		transientOrder.setOrderPlacedTime(LocalDateTime.now());
		transientOrder.setOrderStatus(orderStatusRepo.findByOrderStatusType(OrderStatusType.NEW));
		Order persistentOrder = orderRepo.save(transientOrder);
		Timer timer = new Timer();
		timer.scheduleAtFixedRate(new TimerTask() {

			@Override
			public void run() {

				Order order = orderRepo.findById(persistentOrder.getId())
						.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
				// TODO Auto-generated method stub
				if (order.getLockoutTimeInMinutes() == 0) {
					System.out.println("Order-" + order.getId() + " bidding over");
					if (order.getOrderStatus().getOrderStatusType() == OrderStatusType.NEW) {
						order.setOrderStatus(orderStatusRepo.findByOrderStatusType(OrderStatusType.BIDDING_OVER));
					}
					orderRepo.save(order);
					timer.cancel();
				} else {
					System.out.println("Order-" + order.getId() + " 1 minute passed");
					order.setLockoutTimeInMinutes(order.getLockoutTimeInMinutes() - 1);
					orderRepo.save(order);
				}
			}
		}, 60 * 1000, 60 * 1000);

		// add create temporary table logic
		// orderRepo.createTemporaryTable("temp_table_" + persistentOrder.getId());

		return persistentOrder;
	}

	@Override
	public Set<Order> getAllCompletedOrders(@Valid CompletedOrderDTO completedOrders) {
		Vendor vendor = vendorRepo.findById(completedOrders.getVendorId())
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not Found"));
		com.app.entities.Service service = serviceRepo.findByServiceType(completedOrders.getServiceType())
				.orElseThrow(() -> new ResourceNotFoundException("Service Not Found"));
		OrderStatus orderStatus = orderStatusRepo.findByOrderStatusType(OrderStatusType.COMPLETED);
		return orderRepo.findByOrderStatusAndFinalVendorAndService(orderStatus, vendor, service);
	}

	@Override
	public Set<Order> getAllPendingOrders(CompletedOrderDTO completedOrders) {
		Vendor vendor = vendorRepo.findById(completedOrders.getVendorId())
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not Found"));
		com.app.entities.Service service = serviceRepo.findByServiceType(completedOrders.getServiceType())
				.orElseThrow(() -> new ResourceNotFoundException("Service Not Found"));
		OrderStatus orderStatus = orderStatusRepo.findByOrderStatusType(OrderStatusType.PENDING);
		return orderRepo.findByOrderStatusAndFinalVendorAndService(orderStatus, vendor, service);
	}

	@Override
	public Set<Order> getAllOrderRequests(OrderRequestDTO orderRequestDTO) {
		OrderStatus orderStatus = orderStatusRepo.findByOrderStatusType(OrderStatusType.NEW);
		com.app.entities.Service service = serviceRepo.findByServiceType(orderRequestDTO.getServiceType())
				.orElseThrow(() -> new ResourceNotFoundException("Service Not Found"));
		return orderRepo.findByOrderStatusAndServiceAndCustomerCity(orderStatus, service, orderRequestDTO.getCity());
	}

	@Override
	public Order getOrderById(long orderId) {
		return orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
	}

	@Override
	public void deleteOrderById(long orderId) {
		// add logic to delete all bids corresponding to that order first
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		bidRepo.findByOrder(order).stream().forEach(bidRepo::delete);

		// logic to delete order
		orderRepo.deleteById(orderId);
		// add logic to delete temporary table
		// orderRepo.dropTemporaryTable("temp_table_" + orderId);
	}

	@Override
	public Bid placeBid(PlaceBidDTO placeBidDTO) {
		Vendor v = vendorRepo.findById(placeBidDTO.getVendorId())
				.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
		Order o = orderRepo.findById(placeBidDTO.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Optional<Bid> optional = bidRepo.findByVendorAndOrder(v, o);
		if (optional.isEmpty()) {
			Bid transientBid = new Bid();
			transientBid.setVendor(v);
			transientBid.setOrder(o);
			transientBid.setVendorComments(placeBidDTO.getVendorComments());
			transientBid.setBidPlacedTime(LocalDateTime.now());
			transientBid.setBidAmount(placeBidDTO.getBidAmount());
			return bidRepo.save(transientBid);
		} else {
			Bid persistentBid = optional.get();
			persistentBid.setBidAmount(placeBidDTO.getBidAmount());
			persistentBid.setBidPlacedTime(LocalDateTime.now());
			persistentBid.setVendorComments(placeBidDTO.getVendorComments());
			return persistentBid;
		}
//		long count = orderRepo.checkIfBidExists("temp_table_" + placeBidDTO.getOrderId(), placeBidDTO.getVendorId());
//		if (count == 0l) {
//			orderRepo.addBid("temp_table_" + placeBidDTO.getOrderId(), placeBidDTO.getVendorId(),
//					placeBidDTO.getVendorComments(), LocalDateTime.now(), placeBidDTO.getBidAmount());
//		} else {
//			orderRepo.updateBid("temp_table_" + placeBidDTO.getOrderId(), placeBidDTO.getVendorId(),
//					placeBidDTO.getVendorComments(), LocalDateTime.now(), placeBidDTO.getBidAmount());
//		}
	}

	@Override
	public void deleteBid(DeleteBidDTO deleteBidDTO) {
		Vendor v = vendorRepo.findById(deleteBidDTO.getVendorId())
				.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
		Order o = orderRepo.findById(deleteBidDTO.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Bid bid = bidRepo.findByVendorAndOrder(v, o).orElseThrow(() -> new ResourceNotFoundException("Bid Not Found"));
		bidRepo.delete(bid);
		// orderRepo.deleteBid("temp_table_" + deleteBidDTO.getOrderId(),
		// deleteBidDTO.getVendorId());
	}

	@Override
	public com.razorpay.Order setOrderStatusCompleted(double rating, long orderId) {
		// TODO Auto-generated method stub
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		order.setOrderStatus(orderStatusRepo.findByOrderStatusType(OrderStatusType.COMPLETED));
		order.setRating(rating);
		// logic to update the vendor Rating when order status is set to completed by
		// the customer and rating is provided
		OptionalDouble optionalRating = orderRepo
				.findByFinalVendorAndOrderStatus(order.getFinalVendor(),
						orderStatusRepo.findByOrderStatusType(OrderStatusType.COMPLETED))
				.stream().mapToDouble(o -> o.getRating()).average();
		System.out.println("5" + " | " + optionalRating);
		if (optionalRating.isPresent())
			order.getFinalVendor().setRating(optionalRating.getAsDouble());
		// to delete all corresponding bids after order is completed
		bidRepo.findByOrder(order).forEach(b -> bidRepo.delete(b));
		
		// **add payment logic**
		try {
			RazorpayClient client = new RazorpayClient("rzp_test_MYie72SDxWMksD", "xdvszn2vTkNwdAAYUkFaGWoy");
			JSONObject options = new JSONObject();
			options.put("amount", order.getFinalAmount()*100); // for conversion from Rupee into paisa
			options.put("currency", "INR");
			options.put("receipt", "txn_123456");
			
			// create an order
			com.razorpay.Order razorPayOrder = client.Orders.create(options);
			System.out.println(razorPayOrder);
			return razorPayOrder;
			
		} catch (RazorpayException e) {
			throw new ResourceNotFoundException("Payment failed!!");
		}
		
	}

	@Override
	public Order finalizeBid(PlaceBidDTO finalizeBidDTO) {
		// TODO Auto-generated method stub
		Order order = orderRepo.findById(finalizeBidDTO.getOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Vendor vendor = vendorRepo.findById(finalizeBidDTO.getVendorId())
				.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
		order.setFinalVendor(vendor);
		order.setFinalAmount(finalizeBidDTO.getBidAmount());
		order.setOrderFinalizedTime(LocalDateTime.now());
		order.setVendorComments(finalizeBidDTO.getVendorComments());
		order.setOrderStatus(orderStatusRepo.findByOrderStatusType(OrderStatusType.PENDING));
		order.setLockoutTimeInMinutes(0);
		// send confirmation mail to Vendor and Customer
//		String orderConfirmation = "Order ID - " + order.getId() + "\nVendor Name - " + order.getFinalVendor().getName()
//				+ "\nCustomer Name - " + order.getCustomer().getName() + "\nFinal Amount - " + order.getFinalAmount()
//				+ "\nCategory - " + order.getService().getServiceType() + "\nVendor Comments - "
//				+ order.getVendorComments() + "\nCustomer Comments - " + order.getCustomerComments()
//				+ "\nOrder Finalized Time - " + order.getOrderFinalizedTime().toLocalDate().toString() + " | "
//				+ order.getOrderFinalizedTime().toLocalTime().toString();
//		emailService.sendSimpleMail(new EmailDetails(order.getFinalVendor().getEmail(), orderConfirmation,
//				"Konnect - Order Confirmation ID#" + order.getId(), null));
//		emailService.sendSimpleMail(new EmailDetails(order.getCustomer().getEmail(), orderConfirmation,
//				"Konnect - Order Confirmation ID#" + order.getId(), null));

		// send HTML email async
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				emailService.sendHtmlMail(new EmailDetails(order.getFinalVendor().getEmail(),
						EmailHelper.generateEmailBody(order), "Konnect - Order Confirmation ID#" + order.getId(), null));
				emailService.sendHtmlMail(new EmailDetails(order.getCustomer().getEmail(), EmailHelper.generateEmailBody(order),
						"Konnect - Order Confirmation ID#" + order.getId(), null));				
			}
		}, 0);
		return order;
	}

	@Override
	public Set<Bid> getAllBidsByOrder(long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		return bidRepo.findByOrder(order);
	}

	@Override
	public Set<Order> findOrdersByCustomerAndStatus(long customerId, OrderStatusType orderStatusType) {
		return orderRepo.findByCustomerAndOrderStatus(
				custRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Invalid customer Id")),
				orderStatusRepo.findByOrderStatusType(orderStatusType));
	}

}
