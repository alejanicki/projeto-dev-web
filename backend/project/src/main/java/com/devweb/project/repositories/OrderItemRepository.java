package com.devweb.project.repositories;

import com.devweb.project.entities.OrderItem;
import com.devweb.project.entities.pk.OrderItemPK;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {

}