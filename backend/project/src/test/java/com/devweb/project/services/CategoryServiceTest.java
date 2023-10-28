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

import com.devweb.project.entities.Category;
import com.devweb.project.repositories.CategoryRepository;

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Category> categoryList = new ArrayList<>();
        // Adicione algumas categorias à lista categoryList
        when(categoryRepository.findAll()).thenReturn(categoryList);

        List<Category> result = categoryService.findAll();

        assertEquals(categoryList, result);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Category category = new Category();
        category.setId(id);
        when(categoryRepository.findById(id)).thenReturn(Optional.of(category));

        Category result = categoryService.findById(id);

        assertEquals(id, result.getId());
    }

    @Test
    public void testFindByIdNotFound() {
        Long id = 1L;
        when(categoryRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            categoryService.findById(id);
        });
    }
}