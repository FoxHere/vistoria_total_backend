import { 
    Column, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
} from "typeorm";
import { QuestionarioEntity } from "./questionario.entity";
import { QuestionOptionsEntity } from "./options.entity";

@Entity({ name: 'perguntas'})
export class PerguntaEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => QuestionarioEntity, 
        (questionario) => questionario.question,
        {
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
    )
    questionary: string;

    @Column({name: 'question_text', length: 255, nullable: false})
    questionText: string;

    @Column({name: 'question_type', nullable: false})
    questionType: string;

    @OneToMany(
        () => QuestionOptionsEntity,
        (questionOptionEntity) => questionOptionEntity.questionId,
        { cascade: true, eager: true }
    )
    questionOptions: string;

    @Column({name: 'order', nullable: false})
    order: number;

}