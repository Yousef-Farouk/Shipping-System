// export enum roles
// {
//     employee = 1 ,
//     representative = 2 ,
//     merchant = 3 
// }

import { GroupPrivilegeDTO } from "../../../features/admin/interfaces/group-privilege-dto";

export  class Roles {

    static employee:string = 'employee';

    static representative :string = 'representative';

    static merchant:string = 'merchant';

}


export enum Actions {
    Add ,
    Update ,
    View ,
    Delete
}

export type KnownPermissions = {
  Branch : number
  City  : number
  Employee : number
  Governorate : number
  Merchant : number
  OrderReports  : number
  Orders  : number
  Privileges  : number
  Representative  : number
  Settings  : number
};



export type PremissionMap = KnownPermissions &{
  [key:string]:number
}

export const Permissions = {
  Branch : 'Branch',
  City  : 'City',
  Employee : 'Employee',
  Governorate : 'Branch',
  Merchant : 'Merchant',
  OrderReports  : 'OrderReports',
  Orders  : 'Orders',
  Privileges  : 'Privileges',
  Representative  : 'Representative',
  Settings  : 'Settings'
};



export const actionToPropertyMap: { [key in Actions]: keyof GroupPrivilegeDTO } = {
  [Actions.Add]: 'add',
  [Actions.Update]: 'update',
  [Actions.View]: 'view',
  [Actions.Delete]: 'delete',
  // If you add a new action, you just add it here!
};