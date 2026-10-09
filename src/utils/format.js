const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const dateTime = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export const formatPrice = (value) => currency.format(value ?? 0);

export const formatDateTime = (value) => dateTime.format(new Date(value));

export const formatDate = (value) => date.format(new Date(value));

export const shortId = (id) => `#${String(id).slice(-6).toUpperCase()}`;
