import { Request } from 'express';
import 'express-session'
import { Server as SocketServer } from "socket.io"

declare module 'express' {
	interface Request {
		userId?: string;
		state?: any;
		io?: SocketServer;
	}
}

declare module 'express-session' {
	interface Session {
		post?: string;
	}
}

