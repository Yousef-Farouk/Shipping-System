import { UserDetailsDTO } from '../../../modules/shared/Models/user-details-dto';
import { OrderService } from '../../../modules/shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { OrderStatus } from '../../../modules/shared/Models/Enums';
import { Order } from '../../../modules/shared/Models/Order';
import { RepresentativeService } from '../../representative/representative.service';
import { Representative } from '../../../modules/shared/Models/Representative';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{

  orderStatus= OrderStatus 
  orders : Order[] = [] ;
  representativesList : Representative[] = []
  orderId : number = 0
  modalOpen : boolean = false
  editFlag: boolean = false
  assignModal : boolean = false
  statusModal :boolean = false
  statusForm!:FormGroup

  status : any 

  
  constructor(
    private orderService:OrderService,
    private formBuilder:FormBuilder,
    private representativeService : RepresentativeService
  ) {
    // this.orderStatus = OrderStatus
    
  }
  ngOnInit(): void {

    this.statusForm = this.formBuilder.group({
      status:['',]
    })
    

    this.getAll()
  }


  filterOrder(status:OrderStatus){

    this.orderService.filterOrderByStatus(status).subscribe({

      next:(data:any)=>{
        this.orders = data
        console.log(data)
      }
      ,
      error:(data:any)=>{
        console.log(data)
      }
    })
  }

  deleteOrder(id : number){

    this.orderService.deleteItem(id).subscribe({
      next:(data:any)=>{
        this.orders = data
        console.log(data)
      }
    })
  }

  openModal(id:number) {
    this.modalOpen = true;
    this.statusModal= true ;
    this.orderId = id 
    
  }

  openAssignModal(id:number){
    this.modalOpen = true;
    this.assignModal = true ;
    this.orderId = id 
    this.fillRepresentativeDropDown();
  }

  closeModal() {
    this.modalOpen = false;
    this.editFlag = false;
    this.statusModal = false;
  }

  closeAssignModal() {
    this.modalOpen = false;
    this.editFlag = false;
    this.assignModal = false;
  }


  showStatus(event:Event){
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.status = selectedValue
  }

  changeStatus(){

    console.log(this.orderId,this.statusForm.get('status')?.value)
    console.log(this.statusForm.value)
    this.orderService.changeStatus(this.orderId,this.status).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.closeModal()
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  getAll(){
    this.orderService.getOrders(1,10).subscribe({
      next:(data:Order[])=>{
        this.orders = data
        console.log(data)
      }
    })
  }


  fillRepresentativeDropDown()
  {
      this.representativeService.getRepresentatives().subscribe(
        {
            next:(res:Representative[])=>{
              this.representativesList = res 
            }
        }
      )
  }

}
