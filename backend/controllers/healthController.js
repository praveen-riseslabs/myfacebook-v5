import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
  bucketName,
  getFilename,
  s3,
  s3HealthBaseFolder,
  signedUrl,
} from "../utils/s3Client.js";
import { healthModel } from "../models/healthModel.js";

class HealthController {
  // creating new record.................................................................
  static async createRecord(req, res) {
    try {
      const {
        username,
        doctorName,
        hospitalName,
        description,
        adharCardNumber,
        phoneNumber,
      } = req.body;
      const files = req.files;
      const user = req.user;

      if (
        !username ||
        !doctorName ||
        !hospitalName ||
        !adharCardNumber ||
        !phoneNumber ||
        !files.length
      ) {
        throw new Error("fields are required to save a record");
      }

      //creating filenames
      const filenames = files.map((file) =>
        getFilename(s3HealthBaseFolder, user._id, file, hospitalName)
      );

      //   creating new object and saving it to s3 bucket
      await Promise.all(
        files.map(async (file, i) => {
          //POST/PUT object param
          const putParams = {
            Bucket: bucketName,
            Key: filenames[i],
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(putParams);
          await s3.send(command);
        })
      );

      //creating a new document
      const newRec = new healthModel({
        user,
        username,
        doctorName,
        hospitalName,
        description,
        adharCardNumber,
        phoneNumber,
        files: filenames,
      });
      await newRec.save();

      //signing the object
      const signedFiles = await Promise.all(
        newRec.files.map(async (file) => {
          //GET object param
          const getParam = {
            Bucket: bucketName,
            Key: file,
          };

          const command = new GetObjectCommand(getParam);
          const url = await signedUrl(command);

          return { filename: file, url };
        })
      );

      newRec.populate("user", "-password");

      res.status(201).json({ ...newRec.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //delete record permanently................................................................
  static async deleteRecPermanently(req, res) {
    try {
      const { recId } = req.params;
      const record = await healthModel.findById(recId);

      if (!record) {
        throw new Error("coudn't find health record");
      }

      //deleting the objects
      record.files.map(async (file) => {
        //DELETE object params
        const params = {
          Bucket: bucketName,
          Key: file,
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      });

      //deleting doc from db
      await healthModel.findByIdAndDelete(docId);
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //update record .............................................................................
  static async updateRecord(req, res) {
    try {
      const {
        id,
        username,
        doctorName,
        hospitalName,
        description,
        adharCardNumber,
        phoneNumber,
      } = req.body;

      if (
        !id ||
        !username ||
        !doctorName ||
        !hospitalName ||
        !adharCardNumber ||
        !phoneNumber
      ) {
        throw new Error("fields are required to save a record");
      }

      //updating doc
      const updatedRec = await healthModel.findByIdAndUpdate(
        id,
        {
          username,
          doctorName,
          hospitalName,
          adharCardNumber,
          phoneNumber,
          description,
        },
        { new: true }
      );

      //signing object
      const signedFiles = await Promise.all(
        updatedRec.files.map(async (file) => {
          //GET object param
          const getParam = {
            Bucket: bucketName,
            Key: file,
          };

          const command = new GetObjectCommand(getParam);
          const url = await signedUrl(command);

          return { filename: file, url };
        })
      );

      updatedRec.populate("user", "-password");

      res.status(201).json({ ...updatedRec.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  
  //get all records .............................................................................
  static async getAllRecords(req, res) {
    try {
      const { _id: id } = req.user;
      const { page = 1, recPerPage = 10 } = req.query;

      //finding records
      const records = await healthModel
        .find({ user: id })
        .skip((page - 1) * recPerPage)
        .limit(recPerPage)
        .populate("user", "-password");

      //signing object
      const updatedRecs = await Promise.all(
        records.map(async (doc) => {
          const signedFiles = await Promise.all(
            doc.files.map(async (file) => {
              //get Object Param
              const param = {
                Bucket: bucketName,
                Key: file,
              };

              const command = new GetObjectCommand(param);
              const url = await signedUrl(command);

              return { filename: file, url };
            })
          );
          return { ...doc.toObject(), files: signedFiles };
        })
      );

      res.status(200).json(updatedRecs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //get single record ............................................................................
  static async getRecord(req, res) {
    try {
      const { _id: userId } = req.user;
      const { id } = req.params;

      //finding docs
      const rec = await healthModel
        .findOne({ _id: id, user: userId })
        .populate("user", "-password");

      //signin files
      const signedFiles = await Promise.all(
        rec.files.map(async (file) => {
          // get object param
          const param = {
            Bucket: bucketName,
            Key: file,
          };

          const command = new GetObjectCommand(param);
          const url = await signedUrl(command);

          return { filename: file, url };
        })
      );

      res.status(200).json({ ...rec.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

}

export { HealthController };
