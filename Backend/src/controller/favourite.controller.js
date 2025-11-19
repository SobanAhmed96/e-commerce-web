import { Favourite } from "../model/favourite.js";


const addfavourite = async (req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){ return res.status(401).json({success:false,
            message: "UnAuthrazed"
        })}
        const { productId } = req.body;
        if(!productId){ return res.status(400).json({success:false,
            message: "Product Id is required"
        })}

        const alreadyExist = await Favourite.findOne({userId,productId});
        if(alreadyExist){
            return res.status(400).json({
                success:false,
                message: "Already Added"
            })
        }

        const fav = await Favourite.create({
            userId,
            productId
        });
        return res.status(200).json({
            success: true,
            message: "Add Favourite Product Successfully",
            data: fav
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error
        })
    }
}

const getFavourite = async (req,res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        if(!userId){
            return res.status(401).json({
                success: false,
                message: "UnAuthraized"
            })
        }

        const find = await Favourite.find({userId , productId}).populate('productId');

        if(!find || find.length == 0){
          return ;
        }

        return res.status(200).json({
            success: true,
            message: "Favourite Product Get Successfully",
            data: find
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const getAllFavourite = async (req,res) => {
    try {
        const userId = req.user.id;

        if(!userId){
            return res.status(401).json({
                success: false,
                message: "UnAuthraized"
            })
        }

        const find = await Favourite.find({userId}).populate('productId');

        if(!find || find.length == 0){
          return res.status(404).json({
            success:false,
            message: "Not Found"
          });
        }

        return res.status(200).json({
            success: true,
            message: "Favourite Product Get Successfully",
            data: find
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const delFavourite = async (req,res) => {
    try {
        const userId = req.user?.id;
        const {id}  = req.params;
        
          if(!userId){ return res.status(401).json({success:false,
            message: "Unauthorized"
        })}
        
         if(!id){ return res.status(400).json({success:false,
            message: "Product Id is required"
        })}

        const findAndDel = await Favourite.findByIdAndDelete({_id:id,userId});
        
        return res.status(200).json({
            success: true,
            message: "Favourite Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export { addfavourite, getFavourite, delFavourite, getAllFavourite };