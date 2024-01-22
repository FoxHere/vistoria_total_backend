import { PedidoEntity } from "src/old/pedido/entities/pedido.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
} from "typeorm";

@Entity({ name: 'users'})
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', length:150, nullable: false})
    name: string;

    @Column({name: 'email', length:50, nullable: false})
    email: string;

    @Column({name: 'pass', length:255, nullable: false})
    pass: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string

    @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
    pedidos: PedidoEntity[];
}