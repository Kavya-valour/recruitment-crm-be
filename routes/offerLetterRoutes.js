import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import { getOfferLetters, createOfferLetter, deleteOfferLetter, regenerateOfferLetter } from "../controllers/offerLetterController.js";
=======
import { getOfferLetters, createOfferLetter, deleteOfferLetter } from "../controllers/offerLetterController.js";
>>>>>>> da0db0d (backend project setup)
=======
import { getOfferLetters, createOfferLetter, deleteOfferLetter, regenerateOfferLetter } from "../controllers/offerLetterController.js";
>>>>>>> 434a8b7 (final attendance report + offer letter)

const router = express.Router();

router.get("/", getOfferLetters);
router.post("/", createOfferLetter);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 434a8b7 (final attendance report + offer letter)
router.put("/:id/regenerate", regenerateOfferLetter);
router.delete("/:id", deleteOfferLetter);

export default router;
=======
router.delete("/:id", deleteOfferLetter);

export default router;
>>>>>>> da0db0d (backend project setup)
