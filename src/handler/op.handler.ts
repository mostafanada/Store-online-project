import express, { Request, Response } from "express";
import Jwt  from "jsonwebtoken";
import { order_products,DashboardQueries } from "../Model/op.model";

const dashboard = new DashboardQueries();

export const orderinproduct = async (_req: Request, res: Response) => {
  const users = await dashboard.orderinproduct();
  res.json(users);

};
export const create = async (req: Request, _res: Response) => {
  const usernam: order_products = {
    quantity: req.body.quantity,
    order_id: req.body.order_id,
    product_id: req.body.product_id,
  };
  try {
    const neworderproduct = await dashboard.create(usernam);
    const token = Jwt.sign(
      { orderproduct: neworderproduct },
      process.env.TOKEN_SECRET as string
    );
    _res.json(neworderproduct);
  } catch (err) {
    console.log(err);
    _res.status(400);
    _res.json(err);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const users = await dashboard.index();
    res.json(users);
  } catch (err) {
    console.log(`this is the ${err}`);
  }
};
export const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await dashboard.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
