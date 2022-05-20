import express, { Request, Response } from "express";
import {
  index,
  show,
  create,
  destroy,
  update,
  login,
} from "../handler/user.handler";
import verifyAuthToken from "./authntaction/auth";
const userRoutes = express.Router();
userRoutes.get("/test", (req: Request, res: Response) => {
  try {
    // Verify(req);
    res.send("this is the INDEX route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});
console.log(`control`);
userRoutes.get("/users", verifyAuthToken, index);
userRoutes.get("/users/:id", verifyAuthToken, show);
userRoutes.put("/users/:id", verifyAuthToken, update);
userRoutes.post("/users", create);
userRoutes.delete("/users/:id", verifyAuthToken, destroy);
userRoutes.route("/login").post(login);

export default userRoutes;
