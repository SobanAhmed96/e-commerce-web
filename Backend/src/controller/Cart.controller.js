import { Cart } from '../model/cart.model.js';

const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: user not found',
        status: 401,
      });
    }
    if (!productId || !productId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const exist = await Cart.findOne({ userId, productId });

    if (exist) {
      exist.quantity += quantity || 1;
      await exist.save();
      return res.status(200).json({
        success: true,
        message: 'Product quantity updated in cart',
        cart: exist,
      });
    }
    const newCart = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1,
    });

    return res.status(200).json({
      success: true,
      message: 'Add to cart Successfully',
      cart: newCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const find = await Cart.find({ userId }).populate('productId');

    return res.status(200).json({
      success: true,
      message: 'Get Product',
      find,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const find = await Cart.findById(id);

    if (!find)
      return res
        .status(404)
        .json({ success: false, message: 'Cart item not found' });

    find.quantity = quantity;
    await find.save();
    return res
      .status(200)
      .json({ success: true, message: 'Quantity updated', cart: find });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { addCart, getCart, updateQuantity, removeCart };
