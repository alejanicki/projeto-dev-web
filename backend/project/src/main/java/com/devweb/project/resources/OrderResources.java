package com.devweb.project.resources;

import java.util.List;

import com.devweb.project.entities.Order;
import com.devweb.project.entities.Product;
import com.devweb.project.entities.ShoppingCart;
import com.devweb.project.entities.User;
import com.devweb.project.services.OrderService;
import com.devweb.project.services.ProductService;
import com.devweb.project.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*", allowCredentials = "true")
public class OrderResources {

	@Autowired
	private OrderService service;

	@Autowired
    private ShoppingCart shoppingCart;

	@Autowired
	private ProductService productService;

	@Autowired
	private UserService userService;

	@GetMapping
	public ResponseEntity<List<Order>> findAll() {
		List<Order> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Order> findById(@PathVariable Long id) {
		Order obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PostMapping(value = "/create")
	public ResponseEntity<Order> createOrder(@RequestBody Order order) {
		Order createdOrder = service.createOrder(order);
		return ResponseEntity.ok().body(createdOrder);
	}

	@PostMapping(value = "/add-to-cart/{productId}/{quantity}")
    public ResponseEntity<Void> addToCart(@PathVariable Long productId, @PathVariable int quantity) {
		// Lógica para obter o produto do banco de dados (você pode criar um serviço ProductService)
        Product product = productService.findById(productId);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        // Adiciona o produto ao carrinho
        shoppingCart.addItem(product, quantity);
        return ResponseEntity.ok().build();
    }

	@PostMapping(value = "/checkout")
    public ResponseEntity<Void> checkout(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Realiza a lógica para obter o usuário pelo e-mail
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Realiza o checkout, cria a ordem e limpa o carrinho
        service.createOrderFromCart(user, shoppingCart);
        shoppingCart.clear();

        return ResponseEntity.ok().build();
    }

}