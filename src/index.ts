import express from "express";
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from tk-master backend service...");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
