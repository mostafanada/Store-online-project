import express, { Request, Response } from "express";

import { DashboardQueries } from "../Model/op.model";

const dashboard = new DashboardQueries();

const orderinproduct = async (_req: Request, res: Response) => {
  const users = await dashboard.orderinproduct();
  res.json(users);
};
export default orderinproduct;
