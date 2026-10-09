import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name must be at most 100 characters."),
  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 characters.")
    .max(20, "Phone number must be at most 20 characters."),
  email: Yup.string().trim().required("Email is required.").email("Email is invalid."),
  persons: Yup.number()
    .typeError("Persons must be a number.")
    .required("Persons is required.")
    .integer("Persons must be a whole number.")
    .min(1, "At least one person is required."),
  date: Yup.string()
    .required("Date is required.")
    .test("future", "Please pick a date in the future.", (value) => {
      const time = new Date(value).getTime();
      return !Number.isNaN(time) && time > Date.now();
    }),
});
