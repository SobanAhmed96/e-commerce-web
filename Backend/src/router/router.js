import express from "express";
import { upload } from "../middleware/multer.js";
import { addProduct, deleteProduct, editProduct, getAllProduct, getProductByCategory, getProductById } from "../controller/product.controller.js";
import { addSliderImg, deleteSliderImage, getSliderImg, updateImage } from "../controller/slider.controller.js";
import { createUser, getUser, getUserByID, isLogin, login, logOut, updateProfile } from "../controller/auth.controller.js";
import { addCart, getCart, removeCart, updateQuantity } from "../controller/Cart.controller.js";
import { isAuth } from "../middleware/cartauth.js";
import { checkOut, getAllOrder, getByIdOrder, getUserOrders, statusUpdateProdduct } from "../controller/order.controller.js";
import { addfavourite, delFavourite, getAllFavourite, getFavourite } from "../controller/favourite.controller.js";

const router = express.Router();
// Auth
router.post("/signUp",upload.single("file") ,createUser);
router.post("/login", login);
router.get("/getUser", getUser);
router.get("/isLogin", isLogin);
router.get("/logout", logOut);
router.get("/getUserById",isAuth, getUserByID);
router.put("/updateUser",isAuth, upload.single("profileImage"), updateProfile);

// Product
router.post("/addProduct", upload.array("images", 5), addProduct);
router.get("/getAllProduct", getAllProduct);
router.post("/updateProduct/:id",upload.array("images", 5), editProduct);
router.get("/getProduct/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProductCate/:category",getProductByCategory);

// Slider
router.post("/addSliderImage", upload.array("imagesSlider", 15),addSliderImg);
router.get("/getSliderImage", getSliderImg);
router.put("/updateSliderImg/:id",upload.single("image") ,updateImage);
router.delete("/deleteSliderImg/:id" , deleteSliderImage);

// Cart
router.post("/addToCart",isAuth ,addCart);
router.get("/getCart",isAuth ,getCart);
router.put("/updateCartQuantity/:id", isAuth, updateQuantity);
router.delete("/removeCart/:id", isAuth, removeCart);

// Order
router.post("/checkOut", isAuth , checkOut);
router.get("/getOrder", isAuth , getAllOrder);
router.get("/getOrderById/:id" ,isAuth, getByIdOrder);
router.put("/statusUpdate/:id" , statusUpdateProdduct);
router.get("/getUserOrder", isAuth, getUserOrders);

// favourite
router.post('/addFavourite', isAuth,addfavourite);
router.get('/getFavourite/:id', isAuth,getFavourite);
router.delete("/deleteFavourite/:id", isAuth, delFavourite)
router.get("/getAllFavourite", isAuth, getAllFavourite);


export default router;  