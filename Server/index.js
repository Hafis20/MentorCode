// Server configuration
const express = require("express");
const path = require("path");
const app = express();

// .env configuration
const dotenv = require("dotenv");
dotenv.config();

// Mongodb configuration
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log(error.message));

// Cors configuration
const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:4200","https://mentorcode.vhhafis.online", "https://admin.socket.io"],
  credentials: true,
}));

// Socket configuration
const socketManager = require("./config/socket.js");
const { Server } = require("socket.io");

// Port configuration
const PORT = process.env.PORT || 5000;

// Swagger configurations
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Application middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "Images")));

// Application routers
const adminRouter = require("./routers/adminRouter");
const menteeRouter = require("./routers/menteeRouter");
const mentorRouter = require("./routers/mentorRouter");
const mentorSlotRouter = require("./routers/mentorSlotRouter");
const menteeSlotRouter = require("./routers/menteeSlotRouter");
const paymentRouter = require("./routers/paymentRouter");
const walletRouter = require("./routers/walletRouter");

// calling application middleware for routers
app.use("/api/admin", adminRouter); // For admin operations
app.use("/api/mentee", menteeRouter); // For mentee operations
app.use("/api/mentor", mentorRouter); // For mentor operations
app.use("/api/mentorslot", mentorSlotRouter); // For mentor slot operations
app.use("/api/menteeslot", menteeSlotRouter); // For mentee slot operations
app.use("/api/payment", paymentRouter); // For user payment operations
app.use("/api/wallet", walletRouter); // For wallet operations

const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:4200",
      "https://admin.socket.io",
    ],
    credentials: true,
  },
});

socketManager(io);
