import * as Yup from "yup";

export const profileDetailsSchema = Yup.object({
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
  address: Yup.string()
    .trim()
    .required("Address is required.")
    .max(200, "Address must be at most 200 characters."),
  job: Yup.string().trim().required("Job is required.").max(100, "Job is too long."),
  bio: Yup.string().trim().required("Bio is required.").max(300, "Bio is too long."),
});

export const profileSchema = profileDetailsSchema.shape({
  email: Yup.string().required("Email is required.").email("Email is invalid."),
});
