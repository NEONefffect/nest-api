export interface IRequsetUser extends Request{
    user: IUser
}
 
export interface IUser {
    id: string
    login : string
    role  : string
 }