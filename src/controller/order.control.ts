import express, { Request, Response } from "express";
import { index, show, create, destroy, update } from "../handler/order.handler";
import verifyAuthToken from "./authntaction/auth";

const orderRoutes = express.Router();
// orderRoutes.get("/test", (req: Request, res: Response) => {
//   try {
//     // Verify(req);
//     res.send("this is the INDEX route");
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// });
// console.log(`control`);
orderRoutes.get("/orders", verifyAuthToken, index);
orderRoutes.get("/orders/:id", verifyAuthToken, show);
orderRoutes.put("/orders/:id", verifyAuthToken, update);
orderRoutes.post("/orders", verifyAuthToken, create);
orderRoutes.delete("/orders", verifyAuthToken, destroy);

export default orderRoutes;
