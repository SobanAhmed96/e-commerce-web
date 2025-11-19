import { Cart } from '../model/cart.model.js';
import { Order } from '../model/order.model.js';

const checkOut = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone, address, city, zip, instructions, state } = req.body;

    // Validate delivery info fields

    if (
      [name, phone, address, city, zip, state].some(
        (field) => !field || !field.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Fetch cart items for this user
    const cartItems = await Cart.find({ userId }).populate('productId');

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty',
      });
    }

    // Calculate total and prepare order products array
    let totalPrice = 0;
    const orderedProducts = cartItems.map((item) => {
      const price = item.productId.discountPrice ? item.productId.price - item.productId.discountPrice  : item.productId.price;
      console.log(price);
      
      totalPrice += price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    // Create order
    const order = await Order.create({
      userId,
      products: orderedProducts,
      deliveryInfo: {
        name,
        phone,
        address,
        city,
        zip,
        instructions,
        state,
      },
      totalAmount: totalPrice,
      status: 'pending',
    });

    // Clear the user's cart
    await Cart.deleteMany({ userId });

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'User unAuthraized',
      });
    }
    const find = await Order.find();

    if (find.length <= 0) {
      return res.status(404).json({
        success: false,
        message: 'Orders Not Found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Orders Found Successfully',
      data: find,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Error: ${err}`,
    });
  }
};
const getByIdOrder = async (req, res) => {
  try {
    const  userId = req.user._id;
    if(!userId){
      return res.stutus(401).json({
        success: false,
        message: "UnAuthrized"
      })
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id Is Required',
      });
    }
    const find = await Order.findById(id).populate('products.productId');

    if (!find || find.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Get Product Successfully',
      data: find,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
};
const statusUpdateProdduct = async (req ,res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const find = await Order.findByIdAndUpdate(id , {status} , {new : true});

    if (!find) {
      return res.status(404).json({
        success: false,
        message: 'Order Not Found',
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status Update Successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
}
const getUserOrders = async (req,res) => {
    try {
      const userId = req.user._id;
      
      const findOrder = await Order.find({userId}).populate('products.productId').sort({createdAt: -1})
      if(!findOrder || findOrder.length === 0){
        return res.status(404).json({
          success: false,
          message: "Order not Found"
        })
      }

      return res.status(200).json({
        success: true,
        message: "Order Found Successfully",
        data: findOrder
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error}`
      })
    }
}

export { checkOut, getAllOrder, getByIdOrder, statusUpdateProdduct,getUserOrders };
