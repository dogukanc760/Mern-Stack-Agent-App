import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import {createError} from "../utils/error.js";

export const createHotel = async (req, res, next)=>{
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(201).json({data:savedHotel, message:"Created", status:201});
    }
    catch (err){
        return next(createError(500, err));
    }
}

export const updateHotel = async (req, res, next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json({data:updatedHotel, message:"Updated", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const deleteHotel = async (req, res, next)=>{
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({data:deletedHotel, message:"Deleted", status:200});
    }
    catch (err){
        console.log(err);
        return next(createError(500, err));
    }
}

export const getHotel = async (req, res, next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json({data:hotel, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}

export const getAllHotel = async (req, res, next)=>{
    try {
        const {min, max, ...others} = req.query;
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json({data:hotels, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}

export const countByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json({data:list, message:"Success", status:200});
    }
    catch (e) {
        return next(createError(500, e));
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        res.status(200).json({data:[{type:"hotel", count:hotelCount},
                { type: "apartments", count: apartmentCount },
                { type: "resorts", count: resortCount },
                { type: "villas", count: villaCount },
                { type: "cabins", count: cabinCount },], status:200, message:"Success"})

    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json({data:list, message:"Success", status:200});
    } catch (err) {
        next(err);
    }
};