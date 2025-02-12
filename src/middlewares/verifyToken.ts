import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";


interface CustomJwtPayload extends JwtPayload {
	userId: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
	const token = req.cookies.token;
	//  console.log("this is token", token)
	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

		if (!decoded || typeof decoded.userId !== "string") {
			return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		}
		//  console.log("this is decoded userId", decoded.userId)
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
