import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { upload } from "../middlewares/multer.js";
import { HealthController } from "../controllers/healthController.js";

const router = express.Router();
router.use(requireAuth);

//creating new record
router.post("/new", upload.array("files"), HealthController.createRecord);

//deleting record
router.delete("/:recId", HealthController.deleteRecPermanently)

//updating record
router.put("/update", HealthController.updateRecord)

//get all records
router.get("/", HealthController.getAllRecords)

//get specific record
router.get("/:id", HealthController.getRecord)

export default router;
