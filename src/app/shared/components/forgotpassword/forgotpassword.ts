import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.scss',
})
export class Forgotpassword {

  step : number = 1;
  userEmail: string ='';

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);


  verifyEmail:FormGroup = this.formBuilder.group({
    email:[null, [Validators.email, Validators.required]]
  });

  verifyCode:FormGroup = this.formBuilder.group({
    resetCode:[null, [ Validators.pattern(/^\d{6}$/), Validators.required]]
  });

  resetPassword:FormGroup = this.formBuilder.group({
    email:[null, [Validators.email, Validators.required]],
    newPassword: [null, [Validators.pattern(/^[A-Z]\w{7,}$/), Validators.required]],

  });

  onSubmitEmail(): void {

      let emailValue =  this.verifyEmail.get('email')?.value;

      this.resetPassword.get('email')?.patchValue(emailValue);
      
      this.authService.setEmailVerified(this.verifyEmail.value).subscribe({ 
        next: (res) => {
          console.log('Email verified successfully', res);
          if(res.statusMsg ==='success'){
            this.step = 2;
          }
        }
        ,
        error: (err) => {
          console.error('Error verifying email', err.error);
        }
      });
  }

  onSubmitCode(): void {
    this.authService.verifyResetCode(this.verifyCode.value).subscribe({ 
        next: (res) => {
          console.log('Email verified successfully', res);
          if(res.status ==='Success'){
            this.step = 3;
          }
        }
        ,
        error: (err) => {
          console.error('Error verifying email', err.error);
        }
      });
  }
  onSubmitNewPassword(): void {
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserToken();
          this.router.navigate(['/home']);
        } 
        ,
        error: (err) => {
          console.error('Error resetting password', err.error);
        }
      });
      
  
  }
}


