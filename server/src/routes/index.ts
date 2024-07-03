import { Router } from "express";
import { userRouter } from "./user";
import { projectRouter } from "./project";
import { categoryRouter } from "./category";
import { attributeRouter } from "./attribute";
import { itemRouter } from "./item";
import { itemAttributeRouter } from "./itemAttribute";

export const router = Router();

router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/categories", categoryRouter);
router.use("/attributes", attributeRouter);
router.use("/items", itemRouter);
router.use("/item-attributes", itemAttributeRouter);
