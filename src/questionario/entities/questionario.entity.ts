import { 
    Column,
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
} from "typeorm";
import { PerguntaEntity } from "./perguntas.entity";


// Essa tabela será a principal de criação dos questionários
@Entity({name: 'questionarios'})
export class QuestionarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'title', length: 255, nullable: false})
    title: string;

    @Column({name: 'description', length: 255, nullable: false})
    description: string;

    @OneToMany(
        () => PerguntaEntity,
        (perguntaEntity) => perguntaEntity.questionary,
        { cascade: true, eager: true }
    )
    question: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string

}
