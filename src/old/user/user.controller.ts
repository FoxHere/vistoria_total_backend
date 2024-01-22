import { Body, Controller, Get, Post, Put, Param, Delete } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";

import { ListUserDTO } from "./dto/list-user.dto";
import { UserUpdateDTO } from "./dto/user-update.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UsuarioController {

    //private userRepo: UserRepository = new UserRepository();
    constructor(
        private userRepo: UserRepository,
        private userService: UserService
    ){}
    @Post()
    async onCreate(@Body() userData: CreateUserDTO){
        

        this.userService.onSaveUser(userData);
        return {
            user: new ListUserDTO(
                userData.id, 
                userData.name
            ), 
            message: "O usuário foi cadastrado com sucesso!"
        };
    }

    @Get()
    async onListAll(){

        const savedUsers = await this.userService.onListUsers();
        return savedUsers;
        
    }
    @Put('/:id')
    async onUpdateUser(@Param('id') id: string, @Body() userData: UserUpdateDTO) {
        const updatedUser = await this.userService.onUpdateUser(id, userData); 
        return {
            user: updatedUser,
            message: 'Usuário atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async onDeleteUser(@Param('id') id: string){
        const removedUser = await this.userService.onDeleteUser(id);
        return {
            user: removedUser,
            message: "Usuário removido com sucesso"
        }
    }
}