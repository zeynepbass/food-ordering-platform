import * as Yup from "yup";
import { confirmPasswordRule, passwordRule } from "@/schemas/password";

export const passwordSchema = Yup.object({
  password: passwordRule,
});

export const newPasswordSchema = passwordSchema.shape({
  confirmPassword: confirmPasswordRule,
});

export const changePasswordSchema = newPasswordSchema.shape({
  currentPassword: Yup.string().required("Current password is required."),
});
