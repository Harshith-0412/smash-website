const router = require("express").Router();
const Product = require("../models/Product");
const products = require("../config/products.json");

router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let category = req.query.category || "All";
    let brand = req.query.brand || "All";

    const categoryOptions = await Product.distinct("category");
    const brandOptions = await Product.distinct("brand");

    
    category === "All" ? (category = [...categoryOptions]) : (category = [category]);
    brand === "All" ? (brand = [...brandOptions]) : (brand = [brand]);

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const query = {
      name: { $regex: search, $options: "i" },
      category: { $in: category },
      brand: { $in: brand },
    };

    const products = await Product.find(query)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      brand: brandOptions,
      products,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/dropdownOptions", async (req, res) => {
  try {
    const categoryOptions = await Product.distinct("category");
    const brandOptions = await Product.distinct("brand");

    res.status(200).json({ categoryOptions, brandOptions });
  } catch (err) {
    console.error("Error fetching dropdown options:", err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;