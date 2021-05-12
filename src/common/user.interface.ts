export interface IRequsetUser extends Request{
    user: IUser
}
 
export interface IUser {
    userId: string
    login : string
    role  : string
 }