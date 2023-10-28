package com.devweb.project.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.devweb.project.entities.Order;
import com.devweb.project.repositories.OrderRepository;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Order> orderList = new ArrayList<>();
        // Adicione alguns pedidos à lista orderList
        when(orderRepository.findAll()).thenReturn(orderList);

        List<Order> result = orderService.findAll();

        assertEquals(orderList, result);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Order order = new Order();
        order.setId(id);
        when(orderRepository.findById(id)).thenReturn(Optional.of(order));

        Order result = orderService.findById(id);

        assertEquals(id, result.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        Long id = 1L;
        when(orderRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            orderService.findById(id);
        });
    }
}