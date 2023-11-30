import ProductCard from "@/components/productCard";
import { getProduct } from "@/services/api";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

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

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <main>
      <div className="flex flex-col gap-3 my-2">
        {products !== null ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
