import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
      res.json("Established connection!");
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
