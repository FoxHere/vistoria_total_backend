import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDTO } from "./dto/list-user.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserUpdateDTO } from "./dto/user-update.dto";
import { CreateUserDTO } from "./dto/create-user.dto";
//import { v4 as uuid } from 'uuid'; 

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async onSaveUser(userData: CreateUserDTO){

        const userEntity = new UserEntity();

        userEntity.name = userData.name;
        userEntity.email = userData.email;
        userEntity.pass = userData.pass;
        //userEntity.id = uuid();
        
        await this.userRepository.save(userEntity);
    }

    async onListUsers(): Promise<ListUserDTO[]>{
        const savedUser = await this.userRepository.find();
        const userList = savedUser.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        )
        return userList;
    }

    async onUpdateUser(id: string, userEntity: UserUpdateDTO){
        await this.userRepository.update(id, userEntity);
    }

    async onDeleteUser(id: string){
        await this.userRepository.delete(id);
    }
}