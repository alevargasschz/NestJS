import { isString } from "class-validator"

export class LoginInputDto {
    
    @isString()
    email!: string,
    @isString()
    password!: string,
}
