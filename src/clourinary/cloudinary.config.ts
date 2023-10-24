import { v2 as cloudinary } from 'cloudinary';
import { config as dotEnvConfig } from 'dotenv';
// Load environment variables from .env file
dotEnvConfig();

export const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: 'djdpj9pmk',
    api_key: '532192157621478',
    api_secret: 'k-qv0DKvYLS2uWf8RzjpOuWUs48',
  });
