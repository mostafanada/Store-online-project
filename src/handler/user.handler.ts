import express, { Request, Response } from "express";
import { user, userstore } from "../Model/user.model";
import jwt from "jsonwebtoken";

const store = new userstore();

export const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(`this is the ${err}`);
  }
};

export const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.params.id);
  console.log(user);
  res.json(user);
};

export const create = async (req: Request, _res: Response) => {
  const usernam: user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password_digest: req.body.password_digest,
  };
  try {
    //   {
    //     "first_name": "mostafa",
    //     "last_name": "nada"
    //     "username": "nn@email.com",
    //     "password_digest":"12345",
    // }
    const newuser = await store.create(usernam);
    const token = jwt.sign(
      { user: newuser },
      process.env.TOKEN_SECRET as string
    );
    _res.json(newuser);
  } catch (err) {
    console.log(err);
    _res.status(400);
    _res.json(err);
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
  const user: user = {
    id: parseInt(req.params.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password_digest: req.body.password_digest,
  };
  try {
    const updated = await store.update(user);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(`this is ${err}` + user);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(
      req.body.username,
      req.body.password_digest
    );
    if (user != null) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } else {
      res.json(null);
    }
  } catch (err) {
    res.json({ error: `${err}` });
  }
};
