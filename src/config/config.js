import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
  expiryAccessToken: process.env.ACCESS_TOKEN_EXPIRY,
  expiryRefreshToken: process.env.REFRESH_TOKEN_EXPIRY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = {
  get(key) {
    const value = _config[key];
    if (!value) {
      console.error(
        `The ${key} is not found. Make sure pass correct environment variable`
      );
      process.exit();
    }
    return _config[key];
  },
};
