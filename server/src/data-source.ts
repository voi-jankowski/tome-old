import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Project } from "./entities/Project";
import { Category } from "./entities/Category";
import { Item } from "./entities/Item";
import { Attribute } from "./entities/Attribute";
import { ItemAttribute } from "./entities/ItemAttribute";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // set to true to auto-generate tables, but only in dev mode (not for production)
  logging: true, // set to true to log SQL queries
  entities: [User, Project, Category, Item, Attribute, ItemAttribute],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
});
