import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  myToken: any = localStorage.getItem('userToken');

  // Total number of products in cart
  cartCount = signal(0);

  // Calculate total quantity
  private calculateCartCount(res: any): void {
    const products = res?.data?.products ?? [];

    const total = products.reduce(
      (sum: number, item: any) => sum + item.count,
      0,
    );

    this.cartCount.set(total);
  }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient
      .post(
        `${environment.baseUrl}/api/v1/cart`,
        { productId: id },
        {
          headers: {
            token: this.myToken,
          },
        },
      )
      .pipe(
        tap((res: any) => {
          this.calculateCartCount(res);
        }),
      );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/v1/cart`, {
        headers: {
          token: this.myToken,
        },
      })
      .pipe(
        tap((res: any) => {
          this.calculateCartCount(res);
        }),
      );
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
        headers: {
          token: this.myToken,
        },
      })
      .pipe(
        tap((res: any) => {
          this.calculateCartCount(res);
        }),
      );
  }

  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient
      .put(
        `${environment.baseUrl}/api/v1/cart/${id}`,
        { count: newCount },
        {
          headers: {
            token: this.myToken,
          },
        },
      )
      .pipe(
        tap((res: any) => {
          this.calculateCartCount(res);
        }),
      );
  }
}
