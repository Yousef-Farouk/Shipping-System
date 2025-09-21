import { GroupPrivilegeDTO } from "./group-privilege-dto";

export interface Group {
  id: number;
  name: string;
  dateAdded: Date;
  groupPrivileges: GroupPrivilegeDTO[];
}
