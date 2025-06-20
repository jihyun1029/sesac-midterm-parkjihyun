const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/users.router");
const errorHandler = require("./middleware/error-handler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});