import express, { Request, Response } from "express";
import { order, orderstore } from "../Model/order.model";
import jwt from "jsonwebtoken";

const store = new orderstore();

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    console.log(`this is the ${err}`);
  }
};

export const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.params.id);
  res.json(order);
};

export const create = async (_req: Request, res: Response) => {
  //   {
  //     "user_id": "1",
  //     "status": "active"
  // }
  const order: order = {
    user_id: _req.body.user_id,
    status: _req.body.status,
  };
  try {
    const neworder = await store.create(order);
    const token = jwt.sign(
      { user: neworder },
      process.env.TOKEN_SECRET as string
    );
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
export const update = async (req: Request, res: Response) => {
  const order: order = {
    id: parseInt(req.params.id),
    user_id: req.body.user_id,
    status: req.body.status,
  };
  try {
    const updated = await store.update(order);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(`this is ${err}` + order);
  }
};
