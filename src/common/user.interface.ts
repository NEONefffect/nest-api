export interface IRequsetUser extends Request{
    user: {
        userId: string
        login : string
    }
}
