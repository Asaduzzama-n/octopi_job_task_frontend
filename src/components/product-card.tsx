/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="relative bg-primary/5  rounded-lg  transition  hover:bg-primary/10 shadow-md">
      {/* Image Container */}
      <div className="relative  h-48 overflow-hidden rounded-md ">
        <Image
          className=" h-full w-full"
          src={product.image}
          height={200}
          width={200}
          alt={product.title}
        />
        {/* View More Button (visible on hover) */}
        <div className="absolute inset-0  flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/product/${product.id}`}
            className="bg-primary/50 text-white px-2 py-1 rounded-md"
          >
            View More
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 mt-4 p-2">
        <p className="text-lg font-medium">{product.title}</p>
        <p className="text-pretty font-medium">$ {product.price}</p>
        <p className="line-clamp-1 text-sm">{product.description}</p>
        <span className="text-sm font-semibold bg-primary/20 px-4 rounded-md">
          {product.manufacturer}
        </span>
        <p className="font-medium">{product.category}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="absolute bottom-2 right-2">
        <button className="bg-primary/20 px-2 py-1 flex justify-center items-center gap-2 rounded-md text-primary font-medium hover:opacity-80">
          Add to
          <ShoppingCart className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
