package com.devweb.project.services;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.project.entities.Order;
import com.devweb.project.entities.OrderItem;
import com.devweb.project.entities.Product;
import com.devweb.project.entities.ShoppingCart;
import com.devweb.project.entities.User;
import com.devweb.project.entities.enums.OrderStatus;
import com.devweb.project.repositories.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private OrderItemService orderItemService;

    public List<Order> findAll() {
        return repository.findAll();
    }

    public Order findById(Long id) {
        Optional<Order> obj = repository.findById(id);
        return obj.get();
    }

    public Order createOrder(Order order) {
        return repository.save(order);
    }

    public Order createOrderFromCart(User user, ShoppingCart shoppingCart) {
        // Create a new order
        Order order = new Order();
        order.setClient(user);
        order.setMoment(Instant.now());
        order.setOrderStatus(OrderStatus.PAID); // Set the status as needed
    
        // Add the order to the tb_order table
        order = repository.save(order);
    
        // Add the cart items to the tb_order_item table
        for (Map.Entry<Product, Integer> entry : shoppingCart.getCartItems().entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
    
            // Create the OrderItem using the constructor
            OrderItem orderItem = new OrderItem(order, product, quantity, product.getPrice());
    
            // Add the orderItem to the tb_order_item table
            orderItemService.createOrderItem(orderItem);
        }
    
        return order;
    }
}