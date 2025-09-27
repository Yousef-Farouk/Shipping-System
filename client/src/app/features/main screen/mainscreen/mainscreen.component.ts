
import { Component } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { OrderStatus } from '../../../modules/shared/Models/Enums';
import { Order } from '../../../modules/shared/Models/Order';


@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css']
})
export class MainScreenComponent {
  orderStatus =  OrderStatus

  orderStatusKeys = Object.keys(OrderStatus).filter(key => isNaN(Number(key)));
  
  orders : Order[] = []

  represent_id = ''

  constructor(private orderService:OrderService,private authService : AuthService,private router:Router) { }

  ngOnInit(): void {

    this.getData()
  }

  getEnumKeys<T extends object>(enumType: T): (keyof T)[] {
    return Object.keys(enumType).filter(key => isNaN(Number(key as any))) as (keyof T)[];
  }

  getData()
  {
    //  this.authService.getUserDetails().subscribe({
    //   next:(data:any)=>{
    //       this.represent_id = data.id
    //       console.log(this.represent_id)
    //       this.orderService.getRepresentativeOrders(this.represent_id).subscribe({
    //         next:(data:Order[])=>{
    //           this.orders = data
    //           console.log(data)
    //         }
      
    //       })
    //   }}
    // ) 

    // this.orderService.getAll().subscribe({
    //   next:(data:any)=>{
    //     this.orders = data 
    //   }
    // })
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