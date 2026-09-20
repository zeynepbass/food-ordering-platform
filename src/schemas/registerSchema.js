import * as Yup from "yup";
import { confirmPasswordRule, passwordRule } from "@/schemas/password";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: passwordRule,
  confirmPassword: confirmPasswordRule,
});
