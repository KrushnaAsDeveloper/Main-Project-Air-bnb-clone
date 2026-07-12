import express from "express";
import Listing from "../model/listing.model.js";

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

export const createNewListing = async (req, res) => {
  try {
    console.log(req)
    const newListing = new Listing(req.body);
    await newListing.save();
    res.json({ msg : newListing });
  } catch (error) {
    console.log("create listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    let id = req.params.id;
    let updateList = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateList);
  } catch (error) {
    console.log("update listing", error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

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
