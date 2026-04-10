import express from "express";
import {
  getOfferLetters,
  createOfferLetter,
  deleteOfferLetter,
  regenerateOfferLetter,
} from "../controllers/offerLetterController.js";

const router = express.Router();

// ✅ GET ALL
router.get("/", getOfferLetters);

// ✅ CREATE
router.post("/", createOfferLetter);

// ✅ REGENERATE OFFER LETTER
router.put("/:id/regenerate", regenerateOfferLetter);

// ✅ DELETE
router.delete("/:id", deleteOfferLetter);

export default router;