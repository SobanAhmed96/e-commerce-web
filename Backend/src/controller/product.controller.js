import { Product } from '../model/product.model.js';
import { multiUpload } from '../utils/cloudinary.js';

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      brand,
      description,
      price,
      discountPrice,
      quantity,
      status,
    } = req.body;

    // required fields check
    if (
      [productName, category, brand, description, price, quantity, status].some(
        (field) => !field || (typeof field === 'string' && !field.trim())
      )
    ) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    if (!req.files || !req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'min 1 image is required',
      });
    }

    const imagePath = req.files.map((file) => file.path);

    const uploadImage = await multiUpload(imagePath);

    const prodactData = new Product({
      productName,
      category,
      brand,
      description,
      price,
      discountPrice,
      quantity,
      images: uploadImage,
      status,
    });
    prodactData.save();

    return res.status(201).json({
      success: true,
      message: 'Product Create Successfully',
      data: prodactData,
    });
  } catch (error) {
    console.error('Add Product Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const {pagenum = 1} = req.query;
    
    const limit = req.query.limit || 10;
    const skip = (pagenum - 1) * limit;

    const total = await Product.countDocuments({});
    const find = await Product.find({}).limit(limit).skip(skip);
    if (!find || find.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Get All Product Successfully',
      data: find,
      currentPage: pagenum,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(`get all product Error: ${error}`);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      category,
      brand,
      description,
      price,
      discountPrice,
      quantity,
      status,
    } = req.body;
    const files = req.files;
    let upload = [];
    if (files && files.length > 0) {
      const path = files.map((file) => file.path);
      upload = await multiUpload(path);
    }

    if (!upload) {
      return res.status(400).json({
        success: false,
        message: 'cloudinary update product error',
      });
    }
    const updatedata = {
      productName,
      category,
      brand,
      description,
      price,
      discountPrice,
      quantity,
      status,
    };

    if (upload.length > 0) {
      updatedata.images = upload;
    }
    const find = await Product.findByIdAndUpdate(id, updatedata, { new: true });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: find,
    });
  } catch (error) {
    console.error('Edit Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if(!  id){
      return res.status(400).json({
        success: false,
        message: "product id is required"
      })
    }
    const find = await Product.findById(id);
    if (!find) {
      return res.status(404).json({
        success: false,
        message: 'Not Found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Get Product Successfully',
      data: find,
    });
  } catch (error) {
    console.log(`GetProduct by id error ${error}`);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDelete = await Product.findByIdAndDelete(id);
    if (!productDelete) {
      return res.status(400).json({
        success: false,
        message: 'Product Deleting error',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product Delete Successfully',
    });
  } catch (error) {
    console.log(`Product Deleting Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: 'internal Server Error' + error,
    });
  }
};
const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const find = await Product.find({ category });
    if (!find || find.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'No products found in this category',
        });
    }

    return res.status(200).json({
      success: true,
      message:"Product Found Successfully",
      data:find
    });
  } catch (error) {
    console.log(`Get Product by Category Error: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};
export {
  addProduct,
  getAllProduct,
  editProduct,
  getProductById,
  deleteProduct,
  getProductByCategory
};
