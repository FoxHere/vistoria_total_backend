import { Injectable } from "@nestjs/common/decorators";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository{
    private users: UserEntity[] = [];
    
    async onSave (user: UserEntity){
        this.users.push(user);
    }

    async onList(){
        return this.users;
    }

    async emailExists(email: String): Promise<Boolean>{
        const possibleUser = this.users.find(
            user => user.email === email
        );
        return possibleUser !== undefined;
    }

    private findUserById(id: string){
        // find user 
        const possibleUser = this.users.find(
            user => user.id === id
        );
        // verifica se usuario existe
        if(!possibleUser){
            throw new Error('Usuário não existe');
        }
        return possibleUser;
    }
    async onUpdate(id: string, userData: Partial<UserEntity>){

        const foundUser = this.findUserById(id);
        // garante que o email por exemplo não está sendo subistuido por nada 
        // Object.entries transforma um array chave valor em outros arrays
        Object.entries(userData).forEach(([chave, valor]) => {
            if(chave === 'id'){
                return;
            }
            foundUser[chave] = valor;
        })
        
        return foundUser;

    }

    async onDelete(id: string){
        const foundUser = this.findUserById(id);
        this.users = this.users.filter(
            savedUser => savedUser.id !== id
        )
        return foundUser
    }
}