import express, { Request, Response } from "express";
import orderinproduct from "../handler/op.handler";
import verifyAuthToken from "./authntaction/auth";
const order_product = express.Router();
order_product.get("/order_in_product", verifyAuthToken, orderinproduct);
export default order_product;
