import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class CreateUserDTO{

    id: string;

    @IsString()
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    name: string;

    @IsEmail(undefined, {message: 'O e-mail informado é inválido'})
    @UniqueEmail({ message: "Já existe um usuário com esse email"})
    email: string;

    @MinLength(6)
    pass: string;
}