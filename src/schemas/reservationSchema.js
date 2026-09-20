import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters."),
  phoneNumber: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 characters."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  persons: Yup.number()
    .typeError("Persons must be a number.")
    .required("Persons is required.")
    .min(1, "At least one person is required."),
  date: Yup.string().required("Date is required."),
});
