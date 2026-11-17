import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getALLCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategories(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/categories/${id}`,
    );
  }

  getAllSubCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`);
  }

  getSpecificSubCategories(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/subcategories/${id}`,
    );
  }

  getAllSubCategoriesOnCategory(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/categories/${id}/subcategories`,
    );
  }
}
