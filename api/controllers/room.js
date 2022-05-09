import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
       const savedRoom = await newRoom.save();
       try {
           await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms:savedRoom._id},});
       }
       catch (e) {
           next(createError(500, e));
       }
       res.status(201).json({data:savedRoom, status:201, message:"Created"});
    }
    catch (e) {
        next(createError(500, e));
    }
}


export const updateRoom = async (req, res, next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json({data:updatedRoom, message:"Updated", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
       const updated = await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json({data:updated, message:"Deleted", status:200});
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next)=>{
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({data:deletedRoom, message:"Deleted", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const getRoom = async (req, res, next)=>{
    try {
        const Room = await Room.findById(req.params.id);
        res.status(200).json({data:Room, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}

export const getAllRoom = async (req, res, next)=>{
    try {
        const Room = await Room.find();
        res.status(200).json({data:Room, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}