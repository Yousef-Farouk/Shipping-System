import { GroupPrivilegeDTO } from '../../admin/interfaces/group-privilege-dto';
import { RefreshToken } from './../../../modules/shared/Models/RefreshToken';
export interface Auth {
  user: User | null;
  token : string | null 
  refreshToken : string | null
  loading:boolean;
  isAuthenticated:boolean;
  error:string | null
}


export interface User{
  userId:string
  roleName:string
  roleId:string,
  groupPrivelege:GroupPrivilegeDTO[]
}