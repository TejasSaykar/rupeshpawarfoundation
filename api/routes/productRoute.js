const express = require("express");
const { purchaseProduct } = require("../controllers/productController");
const { userEmail } = require("../utils/userMail");
const { adminEmail } = require("../utils/adminMail");


const router = express.Router();

router.post("/purchase", purchaseProduct);

router.post("/userEmail", userEmail);

router.post("/adminEmail", adminEmail)

module.exports = router;