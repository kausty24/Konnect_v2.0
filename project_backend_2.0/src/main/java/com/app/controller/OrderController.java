package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CompletedOrderDTO;
import com.app.dto.DeleteBidDTO;
import com.app.dto.OrderRequestDTO;
import com.app.dto.PlaceBidDTO;
import com.app.dto.PlaceOrderDTO;
import com.app.dto.RatingDTO;
import com.app.service.IOrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class OrderController {
	@Autowired
	private IOrderService orderService;

	@PostMapping("/order/place")
	public ResponseEntity<?> registerCustomer(@RequestBody @Valid PlaceOrderDTO orderDetails) {
		return new ResponseEntity<>(orderService.placeOrder(orderDetails), HttpStatus.CREATED);
	}

	@PostMapping("/order/completed")
	public ResponseEntity<?> getAllCompletedOrders(@RequestBody @Valid CompletedOrderDTO completedOrderDTO) {
		return new ResponseEntity<>(orderService.getAllCompletedOrders(completedOrderDTO), HttpStatus.OK);
	}

	@PostMapping("/order/pending")
	public ResponseEntity<?> getAllPendingOrders(@RequestBody @Valid CompletedOrderDTO completedOrderDTO) {
		return new ResponseEntity<>(orderService.getAllPendingOrders(completedOrderDTO), HttpStatus.OK);
	}

	@PostMapping("/order/request")
	public ResponseEntity<?> getAllOrderRequests(@RequestBody @Valid OrderRequestDTO orderRequestDTO) {
		return new ResponseEntity<>(orderService.getAllOrderRequests(orderRequestDTO), HttpStatus.OK);
	}

	@GetMapping("/order/{orderId}")
	public ResponseEntity<?> getOrderById(@PathVariable long orderId) {
		return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
	}

	@GetMapping("/order/cancel/{orderId}")
	public ResponseEntity<?> deleteOrderById(@PathVariable long orderId) {
		orderService.deleteOrderById(orderId);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("/order/placebid")
	public ResponseEntity<?> placeBid(@RequestBody PlaceBidDTO placeBidDTO) {
		orderService.placeBid(placeBidDTO);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("/order/deletebid")
	public ResponseEntity<?> deleteBid(@RequestBody @Valid DeleteBidDTO deleteBidDTO) {
		orderService.deleteBid(deleteBidDTO);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("/order/setcompleted")
	public ResponseEntity<String> setOrderStatusCompleted(@RequestBody RatingDTO ratingDTO) {
		// payment is added in this method
		com.razorpay.Order rzpOrder = orderService.setOrderStatusCompleted(ratingDTO.getRating(), ratingDTO.getOrderId());
		System.out.println(rzpOrder);
		return ResponseEntity.ok(rzpOrder.toString());
	}

	@PostMapping("/order/finalize")
	public ResponseEntity<?> finalizeBid(@RequestBody @Valid PlaceBidDTO placeBidDTO) {
		return new ResponseEntity<>(orderService.finalizeBid(placeBidDTO), HttpStatus.OK);
	}

	@GetMapping("/order/getbiddetails/{orderId}")
	public ResponseEntity<?> getAllBidsByOrder(@PathVariable long orderId) {
		return new ResponseEntity<>(orderService.getAllBidsByOrder(orderId), HttpStatus.OK);
	}

}
