import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

export const projectRouter = Router();

projectRouter.get("/", ProjectController.getAllProjects);
projectRouter.get("/:id", ProjectController.getProjectById);
projectRouter.post("/", ProjectController.createProject);
projectRouter.put("/:id", ProjectController.updateProject);
projectRouter.delete("/:id", ProjectController.deleteProject);
