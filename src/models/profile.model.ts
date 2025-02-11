import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface ISocialDetail {
	username: string;
	id: string;
	accessToken: string;
}

export interface IProfile extends Document {
	_id: ObjectId;
	name?: string;
	firstName?: string;
	lastName?: string;
	dob?: Date;
	description?: string;
	nationality?: string;
	address?: string;
	gender?: string;
	interests?: string;
	profilePicture?: string;
	socials?: {
		[platform: string]: ISocialDetail;
	};
}

const socialDetailSchema: Schema<ISocialDetail> = new Schema({
	username: { type: String, required: true },
	id: { type: String, required: true },
	accessToken: { type: String, required: true }
});

const profileSchema: Schema<IProfile> = new Schema(
	{
		name: {
			type: String,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		dob: {
			type: Date,
		},
		nationality: {
			type: String,
		},
		address: {
			type: String,
		},
		description: {
			type: String,
		},
		gender: {
			type: String,
		},
		interests: {
			type: String,
		},
		profilePicture: {
			type: String,
			default:
				"https://tse2.mm.bing.net/th?id=OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa&pid=Api&P=0&h=220",
		},
		socials: {
			type: Map,
			of: socialDetailSchema,
		},
	},
	{ timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
