
import { Component } from '@angular/core';
import { OrderService } from '../../../modules/shared/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { OrderStatus } from '../../../modules/shared/Models/Enums';
import { Order } from '../../../modules/shared/Models/Order';
import { Observable } from 'rxjs';
import { OrderCountDto } from '../../../modules/shared/Models/OrderCountDto';


@Component({
  selector: 'app-employee-mainscreen',
  templateUrl: './employee-mainscreen.component.html',
  styleUrls: ['./employee-mainscreen.component.css']
})
export class EmployeeMainScreenComponent {
  orderStatus =  OrderStatus

  orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));
  
  orders : Order[] = []

  represent_id = ''

  employeeOrders$ : Observable<OrderCountDto[]> = new Observable()

  constructor(private orderService:OrderService,private authService : AuthService,private router:Router) { }

  ngOnInit(): void {

    this.employeeOrders$ = this.getEmployeeData()
    console.log(this.employeeOrders$)
  }

  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getEmployeeData() : Observable<OrderCountDto[]>
  {

    const roleId = this.authService.getRoleId();
    
    return this.orderService.getEmployeeOrderCount(roleId)
  }


  getOrderNumbersByStatus(status :any):number{
    return this.orders.filter(o=>o.orderStatus == status ).length
  }

  representativeOrder(key :any) : boolean{
    if (key != this.orderStatus.DeliveredToRepresentitive || key == this.orderStatus.RejectedFromEmployee || key == this.orderStatus.Pending){

      return true
    }

    return false ;
  }
}