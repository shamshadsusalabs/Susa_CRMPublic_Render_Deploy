import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatSnackBarModule ,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
