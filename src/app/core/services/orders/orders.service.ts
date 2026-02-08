import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);

  myToken:any = localStorage.getItem('userToken');


  checkOutPayment(id : string , data : object): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
      },
      {
        headers:{
          token:this.myToken
        }
      }

    )
}

getUserOrders(id : string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
}

}
