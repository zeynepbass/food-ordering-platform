export const loginFields = [
  { name: "email", type: "email", label: "Email address", autoComplete: "email" },
  { name: "password", type: "password", label: "Password", autoComplete: "current-password" },
];

export const registerFields = [
  { name: "fullName", type: "text", label: "Full name", autoComplete: "name" },
  { name: "email", type: "email", label: "Email address", autoComplete: "email" },
  { name: "password", type: "password", label: "Password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
    autoComplete: "new-password",
  },
];

export const adminLoginFields = [
  { name: "username", type: "text", label: "Username", autoComplete: "username" },
  { name: "password", type: "password", label: "Password", autoComplete: "current-password" },
];

export const reservationFields = [
  { name: "fullName", type: "text", label: "Full name", autoComplete: "name" },
  { name: "phoneNumber", type: "tel", label: "Phone number", autoComplete: "tel" },
  { name: "email", type: "email", label: "Email address", autoComplete: "email" },
  { name: "persons", type: "number", label: "Number of guests", min: 1, inputMode: "numeric" },
  { name: "date", type: "datetime-local", label: "Date and time" },
];

export const profileFields = [
  { name: "fullName", type: "text", label: "Full name", autoComplete: "name" },
  { name: "phoneNumber", type: "tel", label: "Phone number", autoComplete: "tel" },
  { name: "email", type: "email", label: "Email address", readOnly: true },
  { name: "address", type: "text", label: "Delivery address", autoComplete: "street-address" },
  { name: "job", type: "text", label: "Job" },
  { name: "bio", type: "text", label: "Bio" },
];

export const currentPasswordField = {
  name: "currentPassword",
  type: "password",
  label: "Current password",
  autoComplete: "current-password",
};

export const passwordFields = [
  { name: "password", type: "password", label: "New password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm new password",
    autoComplete: "new-password",
  },
];

export const footerFields = [
  { name: "location", type: "text", label: "Address or map link" },
  { name: "email", type: "email", label: "Contact email" },
  { name: "phoneNumber", type: "tel", label: "Phone number" },
  { name: "desc", type: "text", label: "Short description" },
  { name: "day", type: "text", label: "Opening days", placeholder: "Monday - Sunday" },
  { name: "time", type: "text", label: "Opening hours", placeholder: "10:00 - 23:00" },
];
