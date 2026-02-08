import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cart {
// logic api
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  myToken:any = localStorage.getItem('userToken');

  addProductToCart(id :string):Observable <any> {
      return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
        {
            "productId": id
        },
        {
          headers:{
            token:this.myToken
          }
        }

       )

  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }

  removeSpecificCartItem(id :string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }

  updateProductQuantity(id: string , newCount :number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count":newCount
      },
      {
        headers:{
         token: this.myToken
        }
      }
    )
  }
  
}
