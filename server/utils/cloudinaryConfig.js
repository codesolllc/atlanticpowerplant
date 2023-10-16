import cloudinary from 'cloudinary'

const cloudinary = cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export default cloudinary 
