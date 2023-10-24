import express from "express";
import { isAdmin } from "./../utils/isAdmin.js";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/category.controller.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  verifyToken,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  verifyToken,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  verifyToken,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;