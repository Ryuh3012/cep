import { config } from "dotenv";

config()

export const dbUrl = process.env.DB_URL
export const dbPort = process.env.DB_PORT
export const dbUser = process.env.DB_USER
export const dbPassword = process.env.DB_PASSWORD
export const dbName = process.env.DB_NAME
export const tokenPassword = process.env.JWT_SECRET

export const port = process.env.PORT