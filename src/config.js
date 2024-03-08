// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/Database")
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Define the login schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a Mongoose model for the collection
const LoginModel = mongoose.model("User", LoginSchema);

// Export the model
module.exports = LoginModel;
