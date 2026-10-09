/* Seeds an empty database with sample categories, products and footer content. */
const { loadEnvConfig } = require("@next/env");
const mongoose = require("mongoose");

loadEnvConfig(process.cwd());

const categories = ["Pizza", "Burger", "Drinks"];

const products = [
  {
    title: "Margherita",
    desc: "Tomato sauce, fresh mozzarella and basil on a slow-proofed crust.",
    category: "pizza",
    img: "/images/pizza1.png",
    prices: [9.5, 12.5, 15.5],
    extraOptions: [
      { text: "Extra cheese", price: 1.5 },
      { text: "Garlic sauce", price: 1 },
    ],
  },
  {
    title: "Pepperoni",
    desc: "Loaded with beef pepperoni, mozzarella and a touch of oregano.",
    category: "pizza",
    img: "/images/pizza3.png",
    prices: [11, 14, 17],
    extraOptions: [
      { text: "Extra cheese", price: 1.5 },
      { text: "Jalapeno", price: 1 },
    ],
  },
  {
    title: "Garden Veggie",
    desc: "Peppers, mushrooms, olives and sweetcorn over a rich tomato base.",
    category: "pizza",
    img: "/images/pizza5.png",
    prices: [10, 13, 16],
    extraOptions: [{ text: "Extra cheese", price: 1.5 }],
  },
  {
    title: "Four Cheese",
    desc: "Mozzarella, cheddar, parmesan and blue cheese with a creamy base.",
    category: "pizza",
    img: "/images/pizza6.png",
    prices: [12, 15, 18],
    extraOptions: [],
  },
  {
    title: "Classic Cheeseburger",
    desc: "Beef patty, cheddar, pickles, onion and house sauce in a brioche bun.",
    category: "burger",
    img: "/images/hamburger1.png",
    prices: [8.5],
    extraOptions: [
      { text: "Bacon", price: 2 },
      { text: "Double patty", price: 3.5 },
    ],
  },
  {
    title: "Double Stack",
    desc: "Two smashed patties, double cheese, lettuce and tomato.",
    category: "burger",
    img: "/images/hamburger2.png",
    prices: [11.5],
    extraOptions: [{ text: "Bacon", price: 2 }],
  },
  {
    title: "Crispy Chicken",
    desc: "Buttermilk fried chicken, slaw and spicy mayo.",
    category: "burger",
    img: "/images/hamburger3.png",
    prices: [9],
    extraOptions: [{ text: "Extra cheese", price: 1 }],
  },
  {
    title: "Fresh Orange Juice",
    desc: "Squeezed to order, served chilled.",
    category: "drinks",
    img: "/images/drink1.png",
    prices: [4],
    extraOptions: [],
  },
  {
    title: "Iced Latte",
    desc: "Double espresso over ice with cold milk.",
    category: "drinks",
    img: "/images/drink4.png",
    prices: [4.5],
    extraOptions: [{ text: "Vanilla syrup", price: 0.5 }],
  },
];

const footer = {
  location: "https://www.google.com/maps",
  email: "hello@example.com",
  phoneNumber: "+1 555 010 0199",
  desc: "Freshly prepared burgers, pizzas and drinks, delivered hot to your door.",
  openingHours: { day: "Monday - Sunday", hour: "10:00 - 23:00" },
  socialMedia: [
    { icon: "instagram", link: "https://www.instagram.com" },
    { icon: "facebook", link: "https://www.facebook.com" },
  ],
};

const withTimestamps = (doc) => {
  const now = new Date();
  return { ...doc, createdAt: now, updatedAt: now };
};

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Create .env.local first.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const { db } = mongoose.connection;

  const existing = await db.collection("products").countDocuments();
  if (existing > 0) {
    console.log("Database already contains products, nothing to seed.");
    return;
  }

  await db.collection("categories").insertMany(
    categories.map((title) => withTimestamps({ title }))
  );
  await db.collection("products").insertMany(
    products.map((product) =>
      withTimestamps({
        ...product,
        extraOptions: product.extraOptions.map((extra) => ({
          _id: new mongoose.Types.ObjectId(),
          ...extra,
        })),
      })
    )
  );
  if ((await db.collection("footers").countDocuments()) === 0) {
    await db.collection("footers").insertOne(withTimestamps(footer));
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
};

seed()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
