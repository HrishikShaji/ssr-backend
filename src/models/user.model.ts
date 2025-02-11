import mongoose, { Document, Model, Schema, ObjectId } from "mongoose";
import { IProfile } from "./profile.model";

export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	role: string;
	plan: string;
	permissions: string[];
	agents: ObjectId[];
	queries: number;
	isVerified: boolean;
	googleId?: string;
	infiniteQueries?: boolean;
	resetPasswordToken?: string;
	resetPasswordExpiresAt?: Date;
	verificationToken?: string;
	verificationTokenExpiresAt?: Date;
	profile: IProfile["_id"];
}

const userSchema: Schema<IUser> = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "USER",
		},
		agents: [
			{
				type: String,
				ref: "Agent",
			},
		],
		permissions: {
			type: [String],
			default: ["IRESEARCHER", "IRESEARCHER-ADVANCED"]
		},
		plan: {
			type: String,
			default: "FREE",
		},
		queries: {
			type: Number,
			default: 25,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		infiniteQueries: {
			type: Boolean,
			default: false,
			required: false
		},
		googleId: {
			type: String,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordExpiresAt: {
			type: Date,
		},
		verificationToken: {
			type: String,
		},
		verificationTokenExpiresAt: {
			type: Date,
		},
		profile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
			required: true,
		},
	},
	{ timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
