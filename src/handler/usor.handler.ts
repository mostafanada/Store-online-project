import express, { Request, Response } from "express";

import { DashboardQueries } from "../Model/usor.model";

const dashboard = new DashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};
export default usersWithOrders;
