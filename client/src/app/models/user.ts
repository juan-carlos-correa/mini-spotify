export class User{
  constructor(
    public _id: string,
    public role: string,
    public name: string,
    public password: string,
    public surname: string,
    public email: string,
    public image: string
  ){}
}