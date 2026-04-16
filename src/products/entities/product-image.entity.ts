import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: 'product_images'})
export class ProductImage {

    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column('text')
    url!: string;


    @ManyToOne(
        () => Product,
        (prductId) => prductId.id,
        { onDelete: 'CASCADE'}
    )
    product!: Product;

}