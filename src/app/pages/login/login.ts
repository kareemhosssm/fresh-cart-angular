import { Component, inject } from '@angular/core';
import {
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
  isSuccess: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.pattern(/^(?=.*[a-z])(?=.*\d)[A-Z]\w{7,}$/),
      Validators.required,
    ]),
  });

  get passwordValue(): string {
    return String(this.loginForm.get('password')?.value ?? '');
  }

  get startsWithCapital(): boolean {
    return /^[A-Z]/.test(this.passwordValue);
  }

  get hasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            setTimeout(() => {
              // 1- save token in local storage
              localStorage.setItem('userToken', res.token);

              // 2- decode token to get user data
              this.authService.decodeUserToken();

              // navigate to home page
              this.router.navigate(['/home']);
            }, 1000);

            this.isSuccess = 'Login successful! Redirecting...';
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error:', err);

          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
