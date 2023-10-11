import dotenv from 'dotenv'
dotenv.config()
const config = {
    mongodblink : process.env.mongodblink,
    JWT_SEC: process.env.JWT_SEC,
     languages: ['en', 'ar'], 
      defaultLanguage: 'en'
}

export default config;