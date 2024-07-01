import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { ItemAttribute } from "./ItemAttribute";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @OneToMany(() => ItemAttribute, (itemAttribute) => itemAttribute.item)
  itemAttributes: ItemAttribute[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
