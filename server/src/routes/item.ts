import { Router } from "express";
import { ItemController } from "../controllers/ItemController";

export const itemRouter = Router();

itemRouter.get("/", ItemController.getAllItems);
itemRouter.get("/:id", ItemController.getItemById);
itemRouter.post("/", ItemController.createItem);
itemRouter.put("/:id", ItemController.updateItem);
itemRouter.delete("/:id", ItemController.deleteItem);
