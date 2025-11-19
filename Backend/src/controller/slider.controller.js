import { Slider } from '../model/slider.model.js';
import { multiUpload, uploadCloudinary } from '../utils/cloudinary.js';

const addSliderImg = async (req, res) => {
  try {
    const imagespath = req.files;

    if (!imagespath || imagespath.length === 0) {
      return res.status(400).json({
        success: false,
        messsage: 'min 1 image is required',
      });
    }
    const imagePath = imagespath.map((file) => file.path);
    const uploadClou = await multiUpload(imagePath);

    const existSlider =await Slider.findOne();

    if(existSlider){
        if(existSlider.images.length + uploadClou.length > 15){
            return res.status(400).json({
                success: false,
          message: `You can only have up to 15 images. Currently: ${existSlider.images.length}`,
            })
        }
    

    uploadClou.forEach((url) => existSlider.images.push({url}));
    await existSlider.save();

     return res.status(200).json({
        success: true,
        message: "Slider images updated successfully",
        data: existSlider,
      });
    }
    const upload = await Slider.create({
      images: uploadClou.map((url) => ({ url })),
    });

    return res.status(201).json({
      success: true,
      messsage: 'Slider Images upload successfully',
      data: upload,
    });
  } catch (error) {
    console.log(`Add Slider Images Error: ${error}`);
  }
};

const getSliderImg = async (req, res) => {
  try {
    const data = await Slider.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        messsage: 'No slider images found',
      });
    }
    return res.status(200).json({
      success: true,
      messsage: 'Slider images fetched successfully',
      data,
    });
  } catch (error) {
    console.log(`Get Slider Img Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching slider images',
    });
  }
};

const updateImage = async (req ,res) => {
  try {
    const {id} = req.params; 
    const file = req.file;
    if(!file.path || !file){
      return res.status(400).json({
        success: false,
        message: "Image are required"
      })
    }
    
    const newImageurl = await uploadCloudinary(file.path);
    if(!newImageurl){
      return res.status(500).json({
         success: false,
        message: "Failed to upload image to Cloudinary",
      })
    }
    
    const slideImage = await Slider.findOne();
      if (!slideImage) {
      return res.status(404).json({
        success: false,
        message: "Slider document not found",
      });
    }
    const imagesIndex = slideImage.images.findIndex((img) => img._id.toString() === id);

    if(imagesIndex === -1){
        return res.status(404).json({
        success: false,
        message: "Image not found in slider",
      });
    }
    slideImage.images[imagesIndex].url = newImageurl;
     await slideImage.save();
 return res.status(200).json({
      success: true,
      message: "Slider image updated successfully",
      data: slideImage.images[imagesIndex],
    });
  } catch (error) {
       console.error("Update Slider Image Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating slider image",
      error: error.message,

    
  })
};
}

const deleteSliderImage = async (req ,res) => {
  try {
    const { id } = req.params;
     console.log(id);
     
    const find = await Slider.findOne();

    if(!find){
      return res.status(404).json({
        success: false,
        message: "Not Found"
      })
    }
    
    const image = find.images.findIndex((img) => img._id.toString() === id);
    
       if (image === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found in slider",
      });
    }

    find.images.splice(image , 1)
    await find.save();
      return res.status(200).json({
      success: true,
      message: "Slider image deleted successfully",
    });

  } catch (error) {
    console.log(`Slider Image Deleting Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: `Slider Image Deleting Error: ${error}`
    })
  }
}

export { addSliderImg, getSliderImg , updateImage, deleteSliderImage};
