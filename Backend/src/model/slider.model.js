import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    url:{  type: String,
        required: true},
    link:{
        type:String
    }  
});
const sliderSchema = new mongoose.Schema({
    name:{
       type:String,
       default: "Slider Image"
    },
    images:{
        type: [imageSchema],
        validate:{
            validator: function (v){
                return v.length <= 15;
            },
            message: "Slider can contain maximum 15 images"
        },
        isActive:{type:Boolean , default: true},
    },
}, { timestamps: true });

export const Slider = mongoose.model("Slider",sliderSchema);
