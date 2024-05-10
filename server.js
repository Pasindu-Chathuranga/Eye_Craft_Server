const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Image = require("./routes/image-route");
const Order = require("./routes/order-route");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8070;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => {
        console.log(' ✓ Connected to MongoDB Atlas');
        console.log('\n ###########################################################');
    })
    .catch((err) => {
        console.error(' x Error connecting to MongoDB Atlas:', err);
    });

mongoose.connection.once("open", () => {
    console.log(" ✓ Database Synced");
});

app.use("/eyecraft/api/v0/image", Image);
app.use("/eyecraft/api/v0/order", Order);

app.listen(PORT, () => {
    console.log('\n ###########################################################');
    console.log(`\n ✓ Server is running on PORT ${PORT}`);
    console.log(` ✓ Server URL is http://localhost:${PORT}`);
    console.log(` ✓ Server running service URLS`);
    console.log(`    |_ http://localhost:${PORT}/eyecraft/api/v0/image`);
    console.log(`    |_ http://localhost:${PORT}/eyecraft/api/v0/order`);
    
});
