import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  };

  static getUserById = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    res.json(user);
  };

  static createUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.json(result);
  };

  static updateUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  };

  static deleteUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const result = await userRepository.delete(req.params.id);
    res.json(result);
  };
}
