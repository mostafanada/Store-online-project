import express, { Request, Response } from "express";
import usersWithOrders from "../handler/usor.handler";
import verifyAuthToken from "./authntaction/auth";
const user_order = express.Router();
user_order.get("/users-with-orders", verifyAuthToken, usersWithOrders);
export default user_order;
