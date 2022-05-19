import express, { Request, Response } from "express";
import { product, productstore } from "../Model/product.model";
import jwt from "jsonwebtoken";

const store = new productstore();

export const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.log(`this is the ${err}`);
  }
};

export const show = async (_req: Request, res: Response) => {
  const product = await store.show(_req.params.id);
  res.json(product);
};

export const create = async (_req: Request, res: Response) => {
  try {
    const product: product = {
      name: _req.body.name,
      price: _req.body.price,
      category: _req.body.category,
    };
    const newproduct = await store.create(product);
    res.json(newproduct);
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
  const product: product = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const updated = await store.update(product);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(`this is ${err}` + product);
  }
};
