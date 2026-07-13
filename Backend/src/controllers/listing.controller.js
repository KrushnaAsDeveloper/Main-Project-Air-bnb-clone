import express from "express";
import Listing from "../model/listing.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.service.js"
import { ApiError } from "../utils/ApiError.js";
export const findAllListings = async (req, res) => {
  try {
    const myListing = await Listing.find();

    res.json(myListing);
  } catch (error) {
    console.log("all listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const findMylistings = async (req, res) => {
  try {
    const myListing = await Listing.find({ owner: req.user.userId });
    res.json(myListing);
  } catch (error) {
    console.log("my listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const findSingleListing = async (req, res) => {
  try {
    let id = req.params.id;
    const singleList = await Listing.findById(id);

    res.json(singleList);
  } catch (error) {
    console.log("single listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const createNewListing = asyncHandler(async (req, res) => {
    const localFilePath = req.files.image[0].path
    console.log(localFilePath)
    const response = await uploadOnCloudinary(localFilePath)
  console.log(response.url)
    if(response == null) throw new ApiError(501, "file is not saved")
    const createdUser = await Listing.create({...req.body, image : response.url})
    res.json({ msg : createdUser });
}) ;


export const updateListing = asyncHandler( async (req, res) => {
    const localFilePath = req.files.image[0].path
    const response = await uploadOnCloudinary(localFilePath)
    if(response == null) throw new ApiError(501, "Error while updating the image")

    let id = req.params.id;
    let updateList = await Listing.findByIdAndUpdate(id, {...req.body , image : response.url}, {
      new: true,
    });
    res.json(updateList);
  
});

export const deleteListing = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedList = await Listing.findByIdAndDelete(id);
    res.json(deletedList);
  } catch (error) {
    console.log("delete listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
