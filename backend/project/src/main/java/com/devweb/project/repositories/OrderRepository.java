package com.devweb.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.project.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}