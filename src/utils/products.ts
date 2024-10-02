// utils/products.ts

const baseurl = process.env.NEXT_PUBLIC_BASEURL;

export async function getAllProducts({
  searchTerm = "",
  sortBy = "createdAt",
  sortOrder = "asc",
  maxPrice = 10000000,
}: {
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
  maxPrice?: number;
}) {
  // Assuming you're making a backend API call
  const response = await fetch(
    `${baseurl}/product?searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&maxPrice=${maxPrice}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}
