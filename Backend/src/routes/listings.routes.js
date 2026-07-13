import express from "express"
import { Router } from "express"
import { findMylistings, findAllListings, createNewListing, updateListing, deleteListing, findSingleListing } from "../controllers/listing.controller.js"
import { protect } from "../middlewares/user.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

// get - /listings
router.get("/", findAllListings )
router.get("/my", protect, findMylistings )
router.get("/:id", findSingleListing)
// post - /listings
router.post("/" , upload.fields([{
    name : "image", 
    maxCount : 1
}]), createNewListing)
// put - /listing/:id
router.put("/:id",upload.fields([{
    name : "image", 
    maxCount : 1
}]), updateListing)
// delete = /listing/:id
router.delete("/:id", deleteListing)


export default router;