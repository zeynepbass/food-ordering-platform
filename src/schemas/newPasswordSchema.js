import * as Yup from "yup";
import { confirmPasswordRule, passwordRule } from "@/schemas/password";

export const newPasswordSchema = Yup.object({
  password: passwordRule,
  confirmPassword: confirmPasswordRule,
});
