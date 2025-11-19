import { Auth } from '../model/auth.model.js';
import { uploadCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ([username, email, password].some((field) => !field || !field.trim())) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Profile Image are required',
      });
    }
    const check = await Auth.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: 'User already registered',
      });
    }
    const upload = await uploadCloudinary(file.path);

    if (!upload) {
      return res.status(400).json({
        success: false,
        message: 'Upload on Cloudinary Error',
      });
    }

    const data = await Auth.create({
      username,
      email,
      password,
      profileImage: upload,
    });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'User create error',
      });
    }
    const user = data.toObject();
    delete user.password;
    return res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: user,
    });
  } catch (error) {
    console.log(`Create User Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Add User Error: ${error}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const check = await Auth.findOne({ email });

    if (!check) {
      return res.status(400).json({
        success: false,
        message: 'Invalid!',
      });
    }

    const compare = await check.comparePassword(password);

    if (!compare) {
      return res.status(400).json({
        success: false,
        message: 'Invalid!',
      });
    }

    const token = await check.generateToken();

    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = check.toObject();
    delete data.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: data,
      token,
    });
  } catch (error) {
    console.log(`Create User Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Add User Error: ${error}`,
    });
  }
};

const getUser =async (req,res) => {
  try {
    const user = await Auth.find().select("-password");
    const token = req.cookies.token;
     
    if (!token) {
      return res.status(401).json({
        message: "Not authenticated"
      })
    }
    const verify = jwt.verify(token,process.env.JWT_SECRET);
    if (!user || user.length === 0) {
       return res.status(404).json({
      success: false,
      message: "No Users found",
    });
    }

    return res.status(200).json({
    success: true,
    user,
    verify,

  });
  } catch (error) {
    console.log(`Create User Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Add User Error: ${error}`,
    });
  }
}

const isLogin = async (req,res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const finduser = await Auth.findById(verify.id).select("-password");

    
    if (!finduser) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
        verifyToken
      });
    }

    return res.status(200).json({
      success: true,
      data: finduser
    })
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error: ${error}`,

    })
  }
}
const logOut = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token found — user already logged out or not logged in",
      });
    }

    // ✅ Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure only in production
      sameSite: "strict",
    });

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout error",
    });
  }
};

const getUserByID = async (req, res) => {
  try {
     const id = req.user._id;
     
    if(!id){
      return res.status(401).json({
        success: false,
        message: "User not Authorized"
      })
    }
    const find = await Auth.findById(id).select(["-password"]);

    if(find.length === 0 || !find){
      return res.status(404).json({
        success: false,
        message: "Not Found User"
      })
    }

    return res.status(200).json({
      success:  true,
      message: "User Get Successfully",
      data: find
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:error
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, newpassword, oldpassword } = req.body;

    // --- 1. Verify old password if user wants to change password ---
    if (oldpassword && newpassword) {
      const user = await Auth.findById(id);
       
      const isMatch = await user.comparePassword(oldpassword);
      console.log(isMatch);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password does not match",
        });
      }
    }

    // --- 2. Handle optional image upload ---
    let uploadedImageUrl = null;

    if (req.file) {
      uploadedImageUrl = await uploadCloudinary(req.file.path);
      if (!uploadedImageUrl) {
        return res.status(400).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }
    }

    // --- 3. Build update object only with provided fields ---
    const updateData = {};

    if (username) updateData.username = username;
    if (uploadedImageUrl) updateData.profileImage = uploadedImageUrl;

    if (newpassword) {
      updateData.password = newpassword; // Correct field
    }

    // --- 4. Update user ---
    const updatedUser = await Auth.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};


export { createUser , login ,getUser ,isLogin,logOut,getUserByID,updateProfile};
