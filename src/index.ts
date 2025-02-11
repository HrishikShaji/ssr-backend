import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import { NODE_ENV, PORT, SESSION_SECRET } from "./utils/config";
import { connectDB } from "./db/connectDB";

dotenv.config();


const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }))
app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000", "https://www.elevaticsai.com", "https://elevaticsai.com", "http://localhost:3001"];

const corsOptions: CorsOptions = {
	origin: allowedOrigins,
	credentials: true
};

app.use(cors(corsOptions));


app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: NODE_ENV === "production" }
}));


app.get("/api/status", (req, res) => {
	res.send("Server running successfully!")
})


app.listen(PORT, () => {
	connectDB();
	console.log(`server running on port ${PORT} ,server is in ${NODE_ENV} `);
});
