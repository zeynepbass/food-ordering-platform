import * as Yup from "yup";

export const productSchema = Yup.object({
  title: Yup.string().trim().required("Title is required.").max(60, "Title is too long."),
  desc: Yup.string()
    .trim()
    .required("Description is required.")
    .max(300, "Description must be at most 300 characters."),
  category: Yup.string().trim().lowercase().required("Category is required."),
  img: Yup.string().trim().required("Image is required."),
  prices: Yup.array()
    .of(Yup.number().typeError("Price must be a number.").positive("Price must be positive."))
    .min(1, "At least one price is required.")
    .max(3)
    .required("Price is required."),
  extraOptions: Yup.array()
    .of(
      Yup.object({
        text: Yup.string().trim().required("Extra name is required.").max(40),
        price: Yup.number().typeError("Extra price must be a number.").min(0).required(),
      })
    )
    .default([]),
});

export const categorySchema = Yup.object({
  title: Yup.string().trim().required("Title is required.").max(60, "Title is too long."),
});
