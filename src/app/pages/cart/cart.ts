import { Products } from './../products/products';
import { Cart } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {

  private readonly _Cart =inject(Cart)

  cartDetails:ICart ={} as ICart;

  ngOnInit(): void {
    this.getCartData()
  }

  getCartData():void{
    this._Cart.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data); // (totalCartPrice  , Products:[{}])
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  removeITem(id:string):void{
    this._Cart.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        // getCartData
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  updateCount(id :string , count: number):void{
    this._Cart.updateProductQuantity(id ,count).subscribe({
       next:(res)=>{
        console.log(res);
        // getCartData
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
