import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use("/api", router);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
