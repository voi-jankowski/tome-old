import { Router } from "express";
import { ItemAttributeController } from "../controllers/ItemAttributeController";

export const itemAttributeRouter = Router();

itemAttributeRouter.get("/", ItemAttributeController.getAllItemAttributes);
itemAttributeRouter.get("/:id", ItemAttributeController.getItemAttributeById);
itemAttributeRouter.post("/", ItemAttributeController.createItemAttribute);
itemAttributeRouter.put("/:id", ItemAttributeController.updateItemAttribute);
itemAttributeRouter.delete("/:id", ItemAttributeController.deleteItemAttribute);
