package com.devweb.project.entities;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.devweb.project.services.OrderItemService;


@Component
public class ShoppingCart {

    @Autowired
    private OrderItemService orderItemService;

    private Map<Product, Integer> cartItems = new HashMap<>();

    public void addItem(Product product, int quantity) {
        cartItems.put(product, cartItems.getOrDefault(product, 0) + quantity);
    }

    public void removeItem(Product product, int quantity) {
        int currentQuantity = cartItems.getOrDefault(product, 0);
        if (currentQuantity - quantity <= 0) {
            cartItems.remove(product);
        } else {
            cartItems.put(product, currentQuantity - quantity);
        }
    }

    public Map<Product, Integer> getCartItems() {
        return Collections.unmodifiableMap(cartItems);
    }

    public void checkout(User user) {
        // Crie um novo pedido
        Order order = new Order();
        order.setClient(user);

        // Adicione o pedido ao usuário
        user.getOrders().add(order);

        // Adicione os itens do carrinho à tabela tb_order_item
        for (Map.Entry<Product, Integer> entry : cartItems.entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());  // Ajuste conforme necessário
            orderItemService.createOrderItem(orderItem);

            // Se desejar, você pode adicionar orderItem à lista de items em Order:
            // order.getItems().add(orderItem);
        }

        // Limpe o carrinho após o checkout
        cartItems.clear();
    }

    public Object getTotal() {
        return null;
    }

    public void clear() {
        cartItems.clear();
    }
}
