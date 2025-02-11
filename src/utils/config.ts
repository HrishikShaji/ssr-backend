import dotenv from "dotenv"

dotenv.config();

export const SESSION_SECRET = process.env.SESSION_SECRET || ""
export const MONGO_URI = process.env.MONGO_URI || ""
export const PORT = process.env.PORT || ""
export const JWT_SECRET = process.env.JWT_SECRET || ""
export const NODE_ENV = process.env.NODE_ENV || ""

export const SERVER_URL = NODE_ENV === "development" ? "http://localhost:4000" : "https://www.elevaticsai.com"
export const CLIENT_URL = NODE_ENV === "development" ? process.env.CLIENT_URL : process.env.DEPLOYED_CLIENT_URL
export const GOOGLE_ID = NODE_ENV === "development" ? process.env.GOOGLE_ID : process.env.DEPLOYED_GOOGLE_ID
export const GOOGLE_SECRET = NODE_ENV === "development" ? process.env.GOOGLE_SECRET : process.env.DEPLOYED_GOOGLE_SECRET

