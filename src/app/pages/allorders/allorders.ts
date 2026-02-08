import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss',
})
export class Allorders  {
    private readonly ordersService =inject(OrdersService);



showUserOrders(id : string):void{
  this.ordersService.getUserOrders(id).subscribe({
    next:(res)=>{
        console.log(res.data); 
      },
      error:(err)=>{
        console.log(err);
      }
  })
}


}
