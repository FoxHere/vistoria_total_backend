import { Module } from "@nestjs/common";
import { UsuarioController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UniqueEmailValidator } from "./validation/unique-email.validator";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsuarioController],
    providers: [ UserService, UserRepository, UniqueEmailValidator],
})
export class UserModule{}