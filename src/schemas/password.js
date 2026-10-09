import * as Yup from "yup";

export const passwordRule = Yup.string()
  .required("Password is required.")
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be at most 72 characters.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
    "Password must contain at least one uppercase, one lowercase, one number and one special character."
  );

export const confirmPasswordRule = Yup.string()
  .required("Confirm password is required.")
  .oneOf([Yup.ref("password")], "Passwords must match.");
