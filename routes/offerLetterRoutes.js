import express from "express";
<<<<<<< HEAD
import { getOfferLetters, createOfferLetter, deleteOfferLetter, regenerateOfferLetter } from "../controllers/offerLetterController.js";
=======
import { getOfferLetters, createOfferLetter, deleteOfferLetter } from "../controllers/offerLetterController.js";
>>>>>>> da0db0d (backend project setup)

const router = express.Router();

router.get("/", getOfferLetters);
router.post("/", createOfferLetter);
<<<<<<< HEAD
router.put("/:id/regenerate", regenerateOfferLetter);
router.delete("/:id", deleteOfferLetter);

export default router;
=======
router.delete("/:id", deleteOfferLetter);

export default router;
>>>>>>> da0db0d (backend project setup)
