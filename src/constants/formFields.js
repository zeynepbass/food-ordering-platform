export const loginFields = [
  { name: "email", type: "email", placeholder: "Your Email Address" },
  { name: "password", type: "password", placeholder: "Your Password" },
];

export const registerFields = [
  { name: "fullName", type: "text", placeholder: "Your Full Name" },
  { name: "email", type: "email", placeholder: "Your Email Address" },
  { name: "password", type: "password", placeholder: "Your Password" },
  { name: "confirmPassword", type: "password", placeholder: "Your Password Again" },
];

export const adminLoginFields = [
  { name: "username", type: "text", placeholder: "Your Username" },
  { name: "password", type: "password", placeholder: "Your Password" },
];

export const reservationFields = [
  { name: "fullName", type: "text", placeholder: "Your Full Name" },
  { name: "phoneNumber", type: "tel", placeholder: "Your Phone Number" },
  { name: "email", type: "email", placeholder: "Your Email Address" },
  { name: "persons", type: "number", placeholder: "How Many Persons?" },
  { name: "date", type: "datetime-local" },
];

export const profileFields = [
  { name: "fullName", type: "text", placeholder: "Your Full Name" },
  { name: "phoneNumber", type: "tel", placeholder: "Your Phone Number" },
  { name: "email", type: "email", placeholder: "Your Email Address", readOnly: true },
  { name: "address", type: "text", placeholder: "Your Address" },
  { name: "job", type: "text", placeholder: "Your Job" },
  { name: "bio", type: "text", placeholder: "Your Bio" },
];

export const passwordFields = [
  { name: "password", type: "password", placeholder: "Your Password" },
  { name: "confirmPassword", type: "password", placeholder: "Your Confirm Password" },
];

export const footerFields = [
  { name: "location", type: "text", placeholder: "Your Location" },
  { name: "email", type: "email", placeholder: "Your Email" },
  { name: "phoneNumber", type: "tel", placeholder: "Your Phone Number" },
  { name: "desc", type: "text", placeholder: "Your Description" },
  { name: "day", type: "text", placeholder: "Opening Days" },
  { name: "time", type: "text", placeholder: "Opening Hours" },
];
