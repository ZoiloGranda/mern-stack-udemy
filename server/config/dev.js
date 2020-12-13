require('dotenv').config()

module.exports = {
 MONGO_URI: process.env.MONGO_URI,
 JWT_SECRET: process.env.JWT_SECRET,
 SENDGRID_KEY: process.env.SENDGRID_KEY,
 RESET_LINK: process.env.RESET_LINK,
 SENDER_EMAIL: process.env.SENDER_EMAIL,
 CLOUD_NAME: process.env.CLOUD_NAME,
 CLOUD_API_KEY: process.env.CLOUD_API_KEY,
 CLOUD_API_SECRET: process.env.CLOUD_API_SECRET
}