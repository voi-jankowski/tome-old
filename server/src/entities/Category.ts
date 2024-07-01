import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./Project";
import { Attribute } from "./Attribute";
import { Item } from "./Item";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_default: boolean;

  @ManyToOne(() => Project, (project) => project.categories)
  project: Project;

  @OneToMany(() => Attribute, (attribute) => attribute.category)
  attributes: Attribute[];

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
