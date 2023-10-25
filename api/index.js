import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(4000, () => {
  console.log('Server is running on port 4000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);


// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});