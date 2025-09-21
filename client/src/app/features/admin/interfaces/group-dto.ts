import { GroupPrivilegeDTO } from './group-privilege-dto';
export interface GroupDTO {

  Id : number |null;
  name: string;
  groupPrivileges: GroupPrivilegeDTO[];
}
