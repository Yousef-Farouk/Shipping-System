import { Group } from "../../../features/admin/interfaces/group"

export interface Employee {
    id:string
    fullName : String
    userName : String | null
    email : String 
    phone : String
    password : String | null
    branchId : number | null
    branchName : string | null
    groups : Group[] 
    status : boolean
    isDeleted : boolean

}