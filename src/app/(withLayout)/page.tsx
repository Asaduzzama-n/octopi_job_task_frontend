/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import ProductCard from "@/components/product-card";
import { SearchAndFilterBar } from "@/components/search-filter";
import { getAllProducts } from "@/utils/products";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "price";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const maxPrice = searchParams.get("maxPrice") || "10000000";
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await getAllProducts({
        searchTerm: search,
        sortBy,
        sortOrder,
        maxPrice: Number(maxPrice),
      });
      setProducts(response?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search, sortBy, sortOrder, maxPrice]);

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-4/5 lg:w-1/3 bg-primary/5 mx-auto rounded-md p-4">
        <SearchAndFilterBar></SearchAndFilterBar>
      </div>
      <div className="w-full  rounded-md p-4 my-5">
        <div className="grid grid-cols-1 w-4/5  mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6  gap-2">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product?.id} product={product}></ProductCard>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <div className="text-center font-semibold my-10 ">
        <p>
          Due to time constraints, some parts of this page will be implemented
          later (UPDATE, DELETE). Although backend for this part is already
          implemented.
        </p>
        <p>
          LOGIN CREDENTIALS: email: shanto@gmail.com pass: asad123 (SELLER
          LOGIN) | email: asad@gmail.com pass: asad123 (USER LOGIN)
        </p>
        <br />
        <p>***DASHBOAD CONSISTS THE NESTED LAYOUT***</p>
      </div>
    </div>
  );
}
