
import {createError} from "../utils/error.js";
import User from "../models/User.js";



export const updateUser = async (req, res, next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json({data:updatedUser, message:"Updated", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const deleteUser = async (req, res, next)=>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({data:deletedUser, message:"Deleted", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const getUser = async (req, res, next)=>{
    try {
        const User = await User.findById(req.params.id);
        res.status(200).json({data:User, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}

export const getAllUser = async (req, res, next)=>{
    try {
        const User = await User.find();
        res.status(200).json({data:User, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}