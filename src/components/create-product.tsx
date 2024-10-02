/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { productSchema } from "@/lib/schema";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

type CreateProductFormValues = {
  title: string;
  description: string;
  image: string;
  manufacturer: string;
  category: string;
  price: number;
};

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: yupResolver(productSchema),
  });

  const { user } = useAuth();

  const onSubmit = async (data: CreateProductFormValues) => {
    const createdBy = user?.id;
    const productData = { ...data, createdBy };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/product/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      toast.success(result?.message);
    } catch (error) {
      toast.error("Something went wrong please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-4/5 md:w-3/5 rounded-md mx-auto p-4 bg-bg dark:bg-bgd "
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Product Title
            </label>
            <input
              {...register("title")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm "
              placeholder="Title"
            />
            {errors.title && (
              <small className="text-red-500">{errors.title.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="price" className="text-sm font-medium">
              Product Price
            </label>
            <input
              type="number"
              {...register("price")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Price"
            />
            {errors.price && (
              <small className="text-red-500">{errors.price.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="image" className="text-sm font-medium">
              Product Image
            </label>
            <input
              {...register("image")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Image"
            />
            {errors.image && (
              <small className="text-red-500">{errors.image.message}</small>
            )}
          </div>

          <div>
            <label htmlFor="manufacturer" className="text-sm font-medium">
              Product Manufacturer
            </label>
            <input
              {...register("manufacturer")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Manufacturer"
            />
            {errors.manufacturer && (
              <small className="text-red-500">
                {errors.manufacturer.message}
              </small>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Product Description
            </label>
            <input
              {...register("description")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Description"
            />
            {errors.description && (
              <small className="text-red-500">
                {errors.description.message}
              </small>
            )}
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium">
              Product Category
            </label>
            <input
              {...register("category")}
              className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
              placeholder="Category"
            />
            {errors.category && (
              <small className="text-red-500">{errors.category.message}</small>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-40 bg-primary/15 p-2 mt-5 font-semibold text-primary rounded-sm"
          >
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
};
