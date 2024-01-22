import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class UserUpdateDTO{

    @IsString()
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    @IsOptional()
    name: string;

    @IsEmail(undefined, {message: 'O e-mail informado é inválido'})
    @UniqueEmail({ message: "Já existe um usuário com esse email"})
    @IsOptional()
    email: string;

    @MinLength(6)
    @IsOptional()
    pass: string;
}