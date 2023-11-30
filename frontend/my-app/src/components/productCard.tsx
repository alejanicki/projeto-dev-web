// components/ProductCard.tsx
import React, { useState } from "react";
import Button from "./button";
import Link from "next/link";
import { setCookie } from "nookies";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showHide, setShowHide] = useState("hidden");
  const [productList, setProductList] = useState([]);

  const toggleDisplay = () => {
    setShowHide(showHide == "hidden" ? "flex" : "hidden");
  };

  return (
    <div className="bg-darkGrey-500 h-full w-11/12 mx-auto rounded-xl">
      <div className="grid grid-cols-3 p-2" onClick={toggleDisplay}>
        <div className=" col-span-2 mr-4 md:mx-6">
          <h2 className=" font-audiowide text-primary-500 text-2xl text-center md:text-4xl md:mt-4">
            {product.name}
          </h2>
          <p className="text-sm text-justify mt-2 md:text-lg md:mt-4">
            {product.description}
          </p>
          <div className="flex justify-between text-sm my-2 md:text-lg md:my-4">
            <p>Price: ${product.price}</p>
          </div>
        </div>
        <div className="h-full w-full bg-primary-500 rounded-lg">
          <img src="" alt="" />
        </div>
      </div>
      <Link href={"/cart"}>
        <Button
          onClick={() => onAddToCart(product)}
          className={`w-full bg-primary-500 justify-between p-2 text-white font-audiowide rounded-b-lg ${showHide} md:text-xl md:p-6`}
        >
          <h2>Adicionar ao carrinho</h2>
          <h2>➜</h2>
        </Button>
      </Link>
    </div>
  );
};

export default ProductCard;
