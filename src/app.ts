import express from "express";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 20000 })
);

import routers from "./router/index";

app.use("/", routers);

export default app;
