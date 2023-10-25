import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/product.controller.js";
import { isAdmin} from "../utils/isAdmin.js";
import { verifyToken} from "../utils/verifyUser.js";


const router = express.Router();

//routes
router.post(
  "/create-product",
  verifyToken,
  isAdmin,
  createProductController
 
);
//routes
router.put(
  "/update-product/:pid",
  verifyToken,
  isAdmin,
  updateProductController

);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/product/:pid", deleteProductController);

export default router;