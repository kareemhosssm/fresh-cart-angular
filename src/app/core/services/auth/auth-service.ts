import { jwtDecode } from "jwt-decode";
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    
    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);

    userData: any = null;

   
    sendRegisterForm(data: object):Observable<any>
     {
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data); 
     }

     sendLoginForm(data: object):Observable<any>
     {
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data); 
     }

       decodeUserToken(): void { 
         if (localStorage.getItem('userToken') !== null) {
         this.userData =  jwtDecode(localStorage.getItem('userToken')!);
         console.log("userData", this.userData);
    }
      }

      logOut(): void {
        localStorage.removeItem('userToken');
        this.userData = null;
        //navigate to login page
        this.router.navigate(['/login']);
      }

      setEmailVerified(data: object): Observable<any> {
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
      }

      verifyResetCode(data : object): Observable<any> {
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
      }

      resetPassword(data : object): Observable<any> {
        return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
      }

   }

