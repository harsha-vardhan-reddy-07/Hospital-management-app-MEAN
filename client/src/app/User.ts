export interface User {
  _id:string;
  username: string;
  password: string;
  role: Role;
}


export interface Role {
  name:string;
}
