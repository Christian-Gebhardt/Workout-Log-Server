const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const { initData } = require("./config/initData");
const data = require("./data/initData.json");
const { application } = require("express");

dotenv.config();
const port = process.env.PORT || 5500;

connectDB();

const app = express();

initData(data);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logging
app.use(morgan("dev"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/routines", require("./routes/routineRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
