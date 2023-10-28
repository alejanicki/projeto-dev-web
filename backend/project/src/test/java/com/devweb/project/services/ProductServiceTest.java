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

import com.devweb.project.entities.Product;
import com.devweb.project.repositories.ProductRepository;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Product> productList = new ArrayList<>();
        // Adicione alguns produtos à lista productList
        when(productRepository.findAll()).thenReturn(productList);

        List<Product> result = productService.findAll();

        assertEquals(productList, result);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Product product = new Product();
        product.setId(id);
        when(productRepository.findById(id)).thenReturn(Optional.of(product));

        Product result = productService.findById(id);

        assertEquals(id, result.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        Long id = 1L;
        when(productRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            productService.findById(id);
        });
    }
}