import { createHash } from "crypto";

const UPLOAD_FOLDER = "products";

// Cloudinary signs the alphabetically sorted parameters followed by the API secret.
export const signParams = (params, apiSecret) => {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1").update(payload + apiSecret).digest("hex");
};

// Prefers signed uploads, which only an admin can obtain; falls back to an unsigned preset if no API secret is set.
export const getUploadConfig = () => {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (cloudName && apiKey && apiSecret) {
    const params = { folder: UPLOAD_FOLDER, timestamp: Math.floor(Date.now() / 1000) };

    return {
      cloudName,
      fields: { ...params, api_key: apiKey, signature: signParams(params, apiSecret) },
    };
  }

  if (cloudName && uploadPreset) {
    return { cloudName, fields: { upload_preset: uploadPreset } };
  }

  return null;
};
