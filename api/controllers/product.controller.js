import productModel from "../models/product.model.js";
import slugify from "slugify";
import { errorHandler } from "../utils/error.js";

export const createProductController = async (req, res,next) => {
    try {
        const {name,price,quantity,description,shipping,category,imageUrls}=req.body;
        
       
        
        
        
        if(!name){
            
            return next(errorHandler(401,"Please fill Product Name"));
            
        }
        if(!price){
            
            return next(errorHandler(401,"Please fill Product Price"));
        }
        if(!description){
            return next(errorHandler(401,"Please fill Product Description"));
        }
        if(!quantity){
            return next(errorHandler(401,"Please fill Product Quantity"));
        }
        if(!shipping){
            return next(errorHandler(401,"Please Choose Shipping"));
        }
        if(!category){
            return next(errorHandler(401,"Please Select Category"));
        }
        if(imageUrls.length===0){
            return next(errorHandler(401,"Please upload an image"));
        }
        const product = await productModel.create({...req.body,slug:slugify(name)});
        return res.status(201).json(product);
      } catch (error) {
        next(error);
      }
};

//get all products
export const getProductController = async (req, res,next) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
      
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// get single product
export const getSingleProductController = async (req, res,next) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    next(error)
  }
};


//delete controller
export const deleteProductController = async (req, res,next) => {
  try {
    console.log("Delete");
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//upate producta
export const updateProductController = async (req, res,next) => {
  
  try {
    const {name,price,quantity,description,shipping,category,imageUrls}=req.body;
    console.log(imageUrls.length);
   if(!name){
     
     return next(errorHandler(401,"Please fill Product Name"));
     
    }
    
    if(!price){
      
      return next(errorHandler(401,"Please fill Product Price"));
    }
    if(!description){
      return next(errorHandler(401,"Please fill Product Description"));
    }
    if(!quantity){
      return next(errorHandler(401,"Please fill Product Quantity"));
    }
    if(!shipping){
      return next(errorHandler(401,"Please Choose Shipping"));
    }
    if(!category){
      return next(errorHandler(401,"Please Select Category"));
    }
    
    if(imageUrls.length===0){
      return next(errorHandler(401,"Please upload an image"));
    }
   

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
    return res.status(201).json(product);
    
  } catch (error) {
    next(error);
  }

};