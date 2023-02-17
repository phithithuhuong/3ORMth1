import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
//create database
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
     id : number;

    @Column()
     price: number;

    @Column({ type: "varchar" })
     name: string;

    @Column({ type: "varchar" })
     author: string;

    @Column({ type: "varchar" })
     image: string;

}