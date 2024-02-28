import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { bucketName, getFilename, s3, signedUrl } from "../utils/s3Client.js";
import { documentModel } from "../models/documentModel.js";

class DocumentController {
  // creating new document.................................................................
  static async createDocument(req, res) {
    try {
      const { name, belongTo } = req.body;
      const files = req.files;
      const user = req.user;

      if (!name || !belongTo || !files.length) {
        throw new Error(
          "name, belong to and files fields are required to save a document"
        );
      }
      
      //creating filenames
      const filenames = files.map((file) =>
        getFilename(user._id, file, belongTo)
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
      const newDoc = new documentModel({
        user,
        name,
        belongTo,
        files: filenames,
      });
      await newDoc.save();

      //signing the object
      const signedFiles = await Promise.all(
        newDoc.files.map(async (file) => {
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

      newDoc.populate("user", "-password");

      res.status(201).json({ ...newDoc.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //delete document permanently................................................................
  static async deleteDocPermanently(req, res) {
    try {
      const { docId } = req.params;
      const document = await documentModel.findById(docId);

      if (!docId) {
        throw new Error("coudn't find document");
      }

      //deleting the objects
      document.files.map(async (file) => {
        //DELETE object params
        const params = {
          Bucket: bucketName,
          Key: file,
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      });

      //deleting doc from db
      await documentModel.findByIdAndDelete(docId);
      res.status(200).json(document);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //update document .............................................................................
  static async updateDocument(req, res) {
    try {
      const { id, name, belongTo } = req.body;
      console.log(id, name, belongTo);
      if (!name || !belongTo || !id) {
        throw new Error("id, name & belong To cannot be empty");
      }

      //updating doc
      const updatedDoc = await documentModel.findByIdAndUpdate(
        id,
        {
          name,
          belongTo,
        },
        { new: true }
      );

      //signing object
      const signedFiles = await Promise.all(
        updatedDoc.files.map(async (file) => {
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

      updatedDoc.populate("user", "-password");

      res.status(201).json({ ...updatedDoc.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //get all documents .............................................................................
  static async getAllDocuments(req, res) {
    try {
      const { _id: id } = req.user;
      const { page = 1, docPerPage = 10 } = req.query;

      //finding docs
      const docs = await documentModel
        .find({ user: id })
        .skip((page - 1) * docPerPage)
        .limit(docPerPage)
        .populate("user", "-password");

      //signing object
      const updatedDocs = await Promise.all(
        docs.map(async (doc) => {
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

      res.status(200).json(updatedDocs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //get single document ............................................................................
  static async getDocument(req, res) {
    try {
      const { _id: userId } = req.user;
      const { id } = req.params;

      //finding docs
      const doc = await documentModel
        .findOne({ _id: id, user: userId })
        .populate("user", "-password");

      //signin files
      const signedFiles = await Promise.all(
        doc.files.map(async (file) => {
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

      res.status(200).json({ ...doc.toObject(), files: signedFiles });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { DocumentController };
