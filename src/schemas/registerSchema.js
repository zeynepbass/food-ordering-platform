import * as Yup from "yup";
import { confirmPasswordRule, passwordRule } from "@/schemas/password";

export const accountSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name must be at most 100 characters."),
  email: Yup.string().trim().required("Email is required.").email("Email is invalid."),
  password: passwordRule,
});

export const registerSchema = accountSchema.shape({
  confirmPassword: confirmPasswordRule,
});
