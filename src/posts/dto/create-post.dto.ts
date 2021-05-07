import { Users } from "src/users/schemas/user.schemas"

export class CreatePostDto{
    
    title: string
    content: string
    author: Users
    date: Date
    
}