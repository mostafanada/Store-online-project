import express, { Request, Response } from "express";
import {
  index,
  show,
  create,
  destroy,
  update,
} from "../handler/product.handler";
import verifyAuthToken from "./authntaction/auth";
const productRoutes = express.Router();
// productRoutes.get("/test", (req: Request, res: Response) => {
//   try {
//     // Verify(req);
//     res.send("this is the INDEX route");
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// });
// console.log(`control`);
productRoutes.get("/products", verifyAuthToken, index);
productRoutes.get("/products/:id", verifyAuthToken, show);
productRoutes.put("/products/:id", verifyAuthToken, update);
productRoutes.post("/products", verifyAuthToken, create);
productRoutes.delete("/products", verifyAuthToken, destroy);

export default productRoutes;
