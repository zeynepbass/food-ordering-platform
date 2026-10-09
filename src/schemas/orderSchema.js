import * as Yup from "yup";
import { ORDER_STATUS, PAYMENT_METHODS } from "@/constants/order";

const indexOf = (list) => list.map((_, index) => index);

export const orderSchema = Yup.object({
  items: Yup.array()
    .of(
      Yup.object({
        productId: Yup.string().required(),
        sizeIndex: Yup.number().integer().min(0).default(0),
        extraIds: Yup.array().of(Yup.string().required()).default([]),
        quantity: Yup.number().integer().min(1).max(20).default(1),
      })
    )
    .min(1, "Your cart is empty.")
    .max(50)
    .required("Your cart is empty."),
  method: Yup.number().oneOf(indexOf(PAYMENT_METHODS), "Invalid payment method.").required(),
});

export const orderStatusSchema = Yup.object({
  status: Yup.number().oneOf(indexOf(ORDER_STATUS), "Invalid order status.").required(),
});
