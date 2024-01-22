import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerguntaEntity } from "./perguntas.entity";

@Entity({ name: 'question_options'})
export class QuestionOptionsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => PerguntaEntity,
        (perguntaEntity) => perguntaEntity.questionOptions,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete', }
    )
    questionId: string;
    
    @Column({name: 'option_text', length: 255, nullable: true})
    optionText: string;
}