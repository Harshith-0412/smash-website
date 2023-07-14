require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const path = require('path');
const cors = require("cors");
const productRoutes = require("./routes/products");
const app = express();
const port = process.env.PORT || 3000;

dbConnect();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api", productRoutes);




  
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
