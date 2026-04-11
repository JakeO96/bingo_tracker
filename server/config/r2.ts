import { S3Client } from "@aws-sdk/client-s3"

const accountId = process.env.R2_ACCOUNT_ID!
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!

if (!accountId || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing R2 environment variables")
}

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudeflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})