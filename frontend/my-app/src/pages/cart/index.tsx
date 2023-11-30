import ProductCard from '@/components/productCard';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <main>
      <h1>Shopping Cart</h1>
      {cart.map((cartProduct) => (
        <ProductCard key={cartProduct.id} product={cartProduct} onAddToCart={() => {console.log("teste")}} />
      ))}
    </main>
  );
};

export default Cart;
