import express, { Application, json, Request, Response } from "express";
// import bcrypt from 'bcrypt';
// import articleRoutes from "./handler/routsarticle";
import userRoutes from "./controller/use.control";
import orderRoutes from "./controller/order.control";
import productRoutes from "./controller/product.control";
import user_order from "./controller/usor.control";
import order_product from "./controller/op.control";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const app: express.Application = express();
const port = process.env.pg_port || 2000;
// app.get("/api", articleRoutes);
app.use(cors(), helmet(), json(), morgan("dev"));
// app.use(bodyparser);
app.use("/", userRoutes);
app.use("/", orderRoutes);
app.use("/", productRoutes);
app.use("/", order_product);
app.use("/", user_order);

app.get("/", (req: Request, res: Response) => {
  res.send("sasa");
});
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
export default app;
