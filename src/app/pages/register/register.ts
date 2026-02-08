import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

 private readonly authService = inject(AuthService);
 private readonly formBuilder = inject(FormBuilder);
 private readonly router = inject(Router);

 isLoading: boolean = false;
 msgError: string = '';
 isSuccess :string = '';

  RegisterForm: FormGroup = this.formBuilder.group({ 
    name: [null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]],
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.pattern(/^[A-Z]\w{7,}$/), Validators.required]],
    rePassword: [null, Validators.required],
    phone: [null, [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required]],
  }, {validators: this.confirmPassword});


  // RegisterForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //     Validators.required,
  //   ]),
  //   email: new FormControl(null , [Validators.email, Validators.required]),
  //   password: new FormControl(null, [Validators.pattern(/^[A-Z]\w{7,}$/), Validators.required]),
  //   rePassword: new FormControl(null, Validators.required),
  //   phone: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required]),
  // }, {validators: this.confirmPassword});
  



  submitForm(): void {
    if (this.RegisterForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.RegisterForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            // Navigate to login page or show success message
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            
            this.isSuccess = 'Registration successful! Please log in.';
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
      this.RegisterForm.markAllAsTouched();
    }

  }

  confirmPassword(group:AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };

}
}
