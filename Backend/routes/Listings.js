import express from "express"
import { findMylistings, findAllListings, createNewListing, updateListing, deleteListing, findSingleListing } from "../controllers/ListingsControllers.js"
import { protect } from "../middlewares/middleware.js"
const router =  express.Router()

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