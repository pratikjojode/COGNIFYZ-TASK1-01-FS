const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

// Set up Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Route to render the login page
app.get("/", (req, res) => {
  res.render("login");
});

// Route to render the signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Route to handle user registration
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await collection.findOne({ name: username });
    if (existingUser) {
      return res.send("User already exists.");
    }
    const hash = await bcrypt.hash(password, 10);
    await collection.create({ name: username, password: hash });
    res.send("User registered successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await collection.findOne({ name: username });
    if (!user) {
      return res.send("User not found.");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Render the "home" page with a welcome message
      return res.render("home", { username: username }); // Pass username to the template
    } else {
      return res.send("Incorrect password.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in.");
  }
});


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});