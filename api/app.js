const express = require("express")
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/employeeRoute.js");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/images", express.static(path.join(__dirname, "/images")));

// const fullPath = path.resolve(__dirname, '/images');

// Routes
app.use("/api/user", userRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
})
