import bcryptjs from "bcryptjs"
import { Request, Response } from "express"
import { IUser, User } from "../models/user.model"
import { generateVerificationCode } from "../utils/generateVerificationCode"
import { Profile } from "../models/profile.model"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie"


export const signUp = async (req: Request, res: Response): Promise<any> => {
	const { email, password, name } = req.body

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required")
		}

		const userAlreadyExists = await User.findOne({ email })

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already Exists" })
		}

		const hashedPassword = await bcryptjs.hash(password, 10)
		const verificationToken = generateVerificationCode();

		const profile = new Profile({ name: name })

		await profile.save()

		const user = new User({
			email,
			password: hashedPassword,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
			profile: profile._id
		})

		await user.save()
		generateTokenAndSetCookie(res, user._id, user.role)
		//    await sendVerificationEmail(user.email, verificationToken)

		const userData = user.toObject() as Partial<IUser>;
		delete userData.password
		res.status(201).json({
			success: true,
			message: "User created   successfully",
			user: userData,
			profile: profile
		})
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message })
	}
}


export const logIn = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email }).populate("profile").populate("agents").exec()
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" })
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" })
		}

		generateTokenAndSetCookie(res, user._id, user.role);

		await user.save();

		const userData = user.toObject() as Partial<IUser>;
		delete userData.password
		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: userData
		})
	} catch (error: any) {
		console.log("Error in Login", error)
		res.status(400).json({ success: false, message: error.message })
	}
}
export const logOut = async (req: Request, res: Response) => {
	res.clearCookie("token")
	res.status(200).json({ success: true, message: "Logged out successfully" })
}


export const checkAuth = async (req: Request, res: Response): Promise<any> => {
	const userId = req.userId
	console.log("this is userId", userId)
	try {
		const user = await User.findById(userId)
			.select("-password")
			.populate({
				path: "profile",
				select: "name firstName lastName dob description nationality address gender interests profilePicture socials createdAt updatedAt infiniteQueries"
			})
			.populate({ path: "agents" })
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" })
		}

		res.status(200).json({
			success: true,
			user
		})
	} catch (error: any) {
		console.log("Error in checkAuth", error);
		res.status(400).json({ success: false, message: error.message })
	}
}



