import * as Yup from "yup";

const httpUrl = (message) => Yup.string().trim().matches(/^https?:\/\/\S+$/i, message);

const details = {
  location: Yup.string()
    .trim()
    .required("Location is required.")
    .max(300, "Location is too long."),
  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 characters.")
    .max(20, "Phone number must be at most 20 characters."),
  email: Yup.string().trim().required("Email is required.").email("Email is invalid."),
  desc: Yup.string()
    .trim()
    .required("Description is required.")
    .max(300, "Description is too long."),
};

export const socialLinkSchema = Yup.object({
  icon: Yup.string().trim().required("Pick a platform.").max(40),
  link: httpUrl("Link must start with http:// or https://.").required("Link is required."),
});

export const footerSchema = Yup.object({
  ...details,
  day: Yup.string().trim().required("Day is required.").max(60),
  time: Yup.string().trim().required("Time is required.").max(60),
});

export const footerPayloadSchema = Yup.object({
  ...details,
  openingHours: Yup.object({
    day: Yup.string().trim().required("Day is required.").max(60),
    hour: Yup.string().trim().required("Time is required.").max(60),
  }).required(),
  socialMedia: Yup.array().of(socialLinkSchema).max(10).default([]),
});
