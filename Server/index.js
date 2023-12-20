// Server configuration
const express = require("express");
const path = require('path');
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
app.use(cors());

// Port configuration
const PORT = process.env.PORT || 5000;

// Swagger configurations
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express')
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


// Application middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'Images')));

// Application routers
const adminRouter = require("./routers/adminRouter");
const menteeRouter = require("./routers/menteeRouter");
const mentorRouter = require("./routers/mentorRouter");
const mentorSlotRouter = require("./routers/mentorSlotRouter");
const menteeSlotRouter = require("./routers/menteeSlotRouter");
const paymentRouter = require('./routers/paymentRouter');

// calling application middleware for routers
app.use("/admin", adminRouter);           // For admin operations
app.use("/mentee", menteeRouter);        // For mentee operations
app.use("/mentor", mentorRouter);       // For mentor operations
app.use('/mentorslot',mentorSlotRouter); // For mentor slot operations
app.use('/menteeslot',menteeSlotRouter); // For mentee slot operations
app.use('/payment',paymentRouter);     // For user payment operations

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
