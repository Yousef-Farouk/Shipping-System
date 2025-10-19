import { Auth } from './../store/auth.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { ResponseDTO } from '../../../modules/shared/Models/response-dto';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import { LoginDTO } from '../../../modules/shared/Models/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  constructor(private authService: AuthService,
              private router: Router, 
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private store : Store<Auth> 
            ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginDTO = {
        email: this.email?.value,
        password: this.password?.value,
        rememberMe: this.rememberMe?.value
      };
      // this.authService.login(loginCredentials).subscribe({
      //   next: (response : ResponseDTO) => {
      //     this.snackBar.open('تم تسجيل الدخول بنجاح', 'اغلاق', {
      //       duration: 3000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       direction: 'rtl'
      //     });
      //     // console.log("Login done successfully as " + response.role + ":)");
      //     // console.log(`login credentials ${JSON.stringify(loginCredentials)}`)
      //     // console.log(`login credentials ${JSON.stringify(response)}`)
      //     // localStorage.setItem('token', response.token);
      //     // localStorage.setItem('role', response.role);
      //     this.authService.handleLogin(response)
      //     //this.redirectUser(response.role);
      //   },
      //   error: (error) => {
      //     //console.error('Login failed:', error);

      //      this.snackBar.open(error, 'اغلاق', {
      //       duration: 3000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       direction: 'rtl'
      //     })
      //     // if (error.status === 400 && error.error?.errors) {
      //     //   const validationErrors = error.error.errors;
      //     //   if (validationErrors.Email) {
      //     //     console.error('Email validation errors:', validationErrors.Email);
      //     //   }
      //     // } else {
      //     //   console.error('Unexpected error:', error.message);
      //     // }
      //   }
      // });

      this.store.dispatch(AuthActions.login({credentials}))
      // this.authService.login(loginCredentials).subscribe({
      //   next: (response : ResponseDTO) => {
      //     this.snackBar.open('تم تسجيل الدخول بنجاح', 'اغلاق', {
      //       duration: 3000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       direction: 'rtl'
      //     });
      //     this.authService.handleLogin(response)
      //     //this.redirectUser(response.role);
      //   },
      //   error: (error) => {
      //     //console.error('Login failed:', error);

      //      this.snackBar.open(error, 'اغلاق', {
      //       duration: 3000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       direction: 'rtl'
      //     })
      //     // if (error.status === 400 && error.error?.errors) {
      //     //   const validationErrors = error.error.errors;
      //     //   if (validationErrors.Email) {
      //     //     console.error('Email validation errors:', validationErrors.Email);
      //     //   }
      //     // } else {
      //     //   console.error('Unexpected error:', error.message);
      //     // }
      //   }
      // });
    } else {
      this.validateFormFields(this.loginForm);
    }
  }

  // private redirectUser(role: string) {
  //   if (role === Roles.employee ){
  //     this.router.navigate(['/employee']);
  //   } else if (role === Roles.representative) {
  //     this.router.navigate(['/representative']);
  //   } else if (role === Roles.merchant) {
  //     this.router.navigate(['/merchant']);
  //   }
  // }

  // forgetPassword(){

  // }
}
