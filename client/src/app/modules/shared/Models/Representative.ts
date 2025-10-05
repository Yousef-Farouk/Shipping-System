import { Governate } from './Governate';


export interface Representative {
    id:string
    fullName : String
    userName : String | null
    email : String 
    phone : String
    password : String | null
    branchId : number | null
    branchName : string | null
    status : boolean
    isDeleted : boolean
    Governates:Governate[]

}