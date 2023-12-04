// pages/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/button";
import ProductCard from "@/components/productCard";
import { addToCart, decodeToken, getProduct } from "@/services/api";
import { Private } from "@/components/private";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProduct();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSelect = (productId: number) => {
    const isSelected = selectedProductIds.includes(productId);

    if (isSelected) {
      setSelectedProductIds((prevIds) =>
        prevIds.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductIds((prevIds) => [...prevIds, productId]);
    }
  };

  const submit = () => {
    if (products) {
      router.push({
        pathname: "/cart",
        query: {
          selectedProductIds: selectedProductIds.join(","),
          selectedProducts: JSON.stringify(
            products.filter((product) =>
              selectedProductIds.includes(product.id)
            )
          ),
        },
      });
      selectedProductIds.forEach((product: any) => addToCart(product, "1"));
    }
  };

  return (
    <Private>
      <main className="flex flex-col w-1/2 h-screen m-auto">
        <div className="flex flex-row gap-3 my-2 overflow-scroll">
          {products !== null ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProductIds.includes(product.id)}
                onToggleSelect={() => toggleSelect(product.id)}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="h-20 text-2xl">
          <Button color="primary" onClick={submit}>
            Adicionar ao carrinho
          </Button>
        </div>
      </main>
    </Private>
  );
}
