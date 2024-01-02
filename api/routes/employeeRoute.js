const express = require("express")
const { generateIdCard, getIdCard, isApprove, registerUser, loginUser } = require("../controllers/employeeController.js");
const { Email } = require("../utils/sendMail.js");

const router = express.Router();

router.post("/register", registerUser);

router.get("/isapprove/:id", isApprove);

router.post("/email", Email);

router.post("/generateId", generateIdCard);

router.get("/getcard/:id", getIdCard);

router.post("/login", loginUser);

module.exports =  router;