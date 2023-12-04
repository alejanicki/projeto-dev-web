// components/ProductCard.tsx
import React, { useState } from "react";

export default function ProductCard({
  product,
  isSelected,
  onToggleSelect,
}: any) {
  const toggleSelect = () => {
    onToggleSelect(product.id);
  };

  return (
    <div
      className={`bg-darkGrey-500 h-full w-11/12 mx-auto rounded-xl  ${
        isSelected ? "border-primary-500 border-2" : ""
      }`}
      onClick={toggleSelect}
    >
      <div className="grid grid-cols-3 p-2">
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
    </div>
  );
}
