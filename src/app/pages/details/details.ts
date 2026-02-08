import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {

  detailsProduct:IProduct | null = null;

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService =inject(ProductsService)

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params=>{
      const idProduct = params.get('id');
      
      //logic api --- call api specific --getSpecificProducts
      this._ProductsService.getSpecificProducts(idProduct ).subscribe({ 
        next:(res)=>{
          console.log(res.data);
          this.detailsProduct = res.data;
        },
        error:(err)=>{
          console.log(err);
        }


    }
    )
    })
  }

}

