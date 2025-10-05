import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCountDto } from '../../../modules/shared/Models/OrderCountDto';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { OrderService } from '../../../modules/shared/services/order.service';

@Component({
  selector: 'app-representative-mainscreen',
  templateUrl: './representative-mainscreen.component.html',
  styleUrl: './representative-mainscreen.component.css'
})
export class RepresentativeMainscreenComponent implements OnInit {


  representativeOrders$ : Observable<OrderCountDto[]> = new Observable();

  constructor(private authService : AuthService,private orderService : OrderService) {
    
  }

  ngOnInit(): void {

    this.loadRepresentativeOrders()

  }


  loadRepresentativeOrders()
  {
    const roleId = this.authService.getRoleId();
    const representativeId = this.authService.getUserId();
    this.representativeOrders$ = this.orderService.getRepresentativeOrderCount(roleId,representativeId);
  }
}
