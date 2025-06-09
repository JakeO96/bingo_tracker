import {authRouter as authRoutes} from './routes/authRoutes';
import {userRouter as userRoutes} from './routes/userRoutes';
import {boardRouter as boardRoutes} from './routes/boardRoutes';
import { errorHandler } from "./middleware/errorHandler"
import { connectDb } from "./config/dbConnection"
import express from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import WebSocket from 'ws';
import http, { IncomingMessage} from 'http';
//import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';
dotenv.config();

interface ExtendedIncomingMessage extends IncomingMessage {
  user?: { 
    username?: string; 
  };
}

interface ExtendedWebSocket extends WebSocket {
  username?: string;
}

interface ActiveConnections {
  [key: string]: ExtendedWebSocket;
}

mongoose.set("debug", true);
connectDb();
const app = express();
const port = process.env.PORT || 3002;
const devClientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
const prodClientUrl = process.env.PROD_CLIENT_URL || 'https://games.cynkronic.com'
const wwwProdClientUrl = process.env.WWW_PROD_CLIENT_URL || 'https://www.games.cynkronic.com'

const allowedOrigins = [devClientUrl, prodClientUrl, wwwProdClientUrl];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
})

