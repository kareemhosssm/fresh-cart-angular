import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

private readonly authService = inject(AuthService);
 private readonly router = inject(Router);

 isLoading: boolean = false;
 msgError: string = '';
 isSuccess :string = '';

  loginForm: FormGroup = new FormGroup({
    
    email: new FormControl(null , [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^[A-Z]\w{7,}$/), Validators.required]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
           // Navigate to login page or show success message
          if (res.message === 'success') {
            setTimeout(() => {
               //1- save token in local storage
              localStorage.setItem('userToken', res.token);
              //2- decode token to get user data
              this.authService.decodeUserToken(); 
              //navigate to home page
              this.router.navigate(['/home']);
            }, 1000);
            
            this.isSuccess = 'Login successful! Redirecting...';
          }
          this.isLoading = false;
        },
        error: (err:HttpErrorResponse) => {
          console.error('Error:', err);

         this.msgError= err.error.message
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
