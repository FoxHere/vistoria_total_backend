import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common/decorators";

@Injectable()
@ValidatorConstraint({async: true})
export class UniqueEmailValidator implements ValidatorConstraintInterface{
    
    constructor(private userRepo: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>{
        const userWithEmailExists = await this.userRepo.emailExists(value);
        return !userWithEmailExists;
    }
    
}

export const UniqueEmail = (validationOtions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOtions,
            constraints: [],
            validator: UniqueEmailValidator
        });
    }
}


