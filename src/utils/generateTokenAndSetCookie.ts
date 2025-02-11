import { Response } from "express"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"
import { JWT_SECRET, NODE_ENV } from "./config"

export const generateTokenAndSetCookie = (res: Response, userId: ObjectId, role: string) => {
	const token = jwt.sign({ userId, role }, JWT_SECRET, {
		expiresIn: "7d"
	})

	res.cookie("token", token, {
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000
	})

	return token
}
