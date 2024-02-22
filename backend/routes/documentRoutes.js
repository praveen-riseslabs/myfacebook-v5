import express from "express";
import { DocumentController } from "../controllers/documentController.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router.use(requireAuth);

//creating new document
router.post("/new", upload.array("files"), DocumentController.createDocument);

//deleting documents
router.delete("/:docId", DocumentController.deleteDocPermanently)

//updating documents
router.put("/update", DocumentController.updateDocument)

//get all documents
router.get("/", DocumentController.getAllDocuments)

//get specific document
router.get("/:id", DocumentController.getDocument)

export default router;
