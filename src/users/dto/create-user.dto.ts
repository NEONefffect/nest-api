import { Posts } from "src/posts/schemas/post.shemas"

export class CreateUserDto {
        
    firstName:string
    lastName:string  
    email: string
    role: string
    login:string
    password:string
    posts: Posts[]
}
