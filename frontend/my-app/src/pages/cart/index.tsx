// pages/cart.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/pages/index"; // Importe a interface Product ou ajuste o caminho conforme necessário
import Button from "@/components/button";
import { addToCart, checkout } from "@/services/api";
import { Private } from "@/components/private";

const Cart: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const { selectedProducts } = router.query;

    if (selectedProducts) {
      const selectedProductsArray: Product[] = JSON.parse(
        selectedProducts as string
      );

      setCartItems(selectedProductsArray);

      // Calcula o preço total
      const newTotalPrice = selectedProductsArray.reduce(
        (total, product) => total + product.price,
        0
      );

      setTotalPrice(newTotalPrice);
    }
  }, [router.query]);

  const handleClick = () => {
    checkout();
  };

  return (
    <Private>
      <div className="w-1/2 m-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Carrinho de Compras</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-300 py-2"
              >
                <div className="w-2/3">
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="bg-gray-200 p-4 rounded">
              <p className="text-lg font-bold mb-2">Total:</p>
              <p className="text-xl">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <Button onClick={handleClick}>Finalizar</Button>
      </div>
    </Private>
  );
};

export default Cart;
