import * as yup from "yup";

export const signupSchema = yup.object({
  firstName: yup.string().required("Firs Name is required"),
  lastName: yup.string().optional(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().required("Role is required"),
});

export const signinSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const productSchema = yup.object({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  image: yup
    .string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  manufacturer: yup.string().required("Manufacturer is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});
