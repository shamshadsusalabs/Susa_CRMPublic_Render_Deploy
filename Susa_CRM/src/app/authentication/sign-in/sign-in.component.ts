import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: LoginService,   private router: Router,    private snackBar: MatSnackBar ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const formValue = this.signInForm.value;
      if (formValue.role === 'superadmin') {
        this.apiService.loginAsSuperAdmin(formValue).subscribe(response => {
          console.log('Login successful:', response);
          this.storeUserData(response);
          this.router.navigate(['/DashBoard/dashboard']);

        }, error => {
          console.log('Login failed:', error);
          // Handling 401 Unauthorized specifically
          if (error.status === 401) {
            this.showSnackbar('Invalid credentials. Please enter correct credentials.');
          } else {
            this.showSnackbar('Login failed. Please try again.');
          }
        });
      }
    } else {
      if (this.signInForm.get('email')?.errors) {
        this.showSnackbar('Please enter a valid email address.');
      } else if (this.signInForm.get('password')?.errors) {
        this.showSnackbar('Please enter your password.');
      } else if (this.signInForm.get('role')?.errors) {
        this.showSnackbar('Please select a role.');
      }
    }
  }

  private storeUserData(response: any) {
    localStorage.setItem('token', response.token); // Assume response contains a token
    localStorage.setItem('email', response.user.email);
    localStorage.setItem('id', response.user.id); // Assume response contains a userId
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    });
  }
}
