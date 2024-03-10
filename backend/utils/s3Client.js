import { S3Client } from "@aws-sdk/client-s3";
import { getRandomString } from "../utils/getRandomString.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//aws config
export const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const urlExpiry = process.env.SIGNED_URL_EXPIRATION_VALUE;
export const s3DocumentBaseFolder = "myDocuments";
export const s3HealthBaseFolder = "myHealth";

//initializing s3 client
export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// creating random file names
export const getFilename = (baseFolder, id, file, subCategory) =>
  baseFolder +
  "/" +
  id +
  "/" +
  subCategory +
  "/" +
  getRandomString() +
  "_" +
  file.originalname;

//singing url
export const signedUrl = async (command) => {
  return await getSignedUrl(s3, command, {
    expiresIn: Number(urlExpiry),
  });
};
