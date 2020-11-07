import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const app = express();

const PORT = process.env.port || 8000;

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        `<div id="root"></div>`,
        `<div id="root">${renderToString(<App />)}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
