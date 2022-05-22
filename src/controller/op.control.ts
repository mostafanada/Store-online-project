import express, { Request, Response } from "express";
import {index,create,orderinproduct,destroy} from "../handler/op.handler";
import verifyAuthToken from "./authntaction/auth";
const order_product = express.Router();
order_product.get("/order_in_products", verifyAuthToken, orderinproduct);
order_product.get("/order_in_product", verifyAuthToken, index);
order_product.post("/order_in_product", verifyAuthToken, create);
order_product.delete("/order_in_product/:id", verifyAuthToken, destroy);

export default order_product;
