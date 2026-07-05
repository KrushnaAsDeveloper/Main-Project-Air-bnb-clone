import express from "express"
import { Router } from "express"
import { findMylistings, findAllListings, createNewListing, updateListing, deleteListing, findSingleListing } from "../controllers/listing.controller.js"
import { protect } from "../middlewares/user.middleware.js"
const router = Router()

// get - /listings
router.get("/", findAllListings )
router.get("/my", protect, findMylistings )
router.get("/:id", findSingleListing)
// post - /listings
router.post("/", protect , createNewListing)
// put - /listing/:id
router.put("/:id", protect, updateListing)
// delete = /listing/:id
router.delete("/:id", protect, deleteListing)


export default router;