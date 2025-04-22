const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.DEV_PORT;

const nameRoutes = require("./routes/nameRoutes");

app.use("/", nameRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});