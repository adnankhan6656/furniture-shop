import categoryModel from "../models/category.model.js";
import slugify from "slugify";
import { errorHandler } from '../utils/error.js';
export const createCategoryController = async (req, res,next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(errorHandler(401, 'Category name is required'));;
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return next(errorHandler(200, 'Category Already exist'));;
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    next(error);
  }
};

//update category
export const updateCategoryController = async (req, res,next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
      next(error);
   
  }
};

// get all cat
export const categoryControlller = async (req, res,next) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
      next(error);
    
  }
};

// single category
export const singleCategoryController = async (req, res,next) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res,next) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};