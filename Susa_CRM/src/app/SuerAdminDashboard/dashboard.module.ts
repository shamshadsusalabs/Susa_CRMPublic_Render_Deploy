import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TaskComponent } from './task/task.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CalenderComponent } from './calender/calender.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    TaskComponent,
    MainComponentComponent,
    CalenderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatSnackBarModule,
    FullCalendarModule,
    NgxMatTimepickerModule,

    MatInputModule,
    MatNativeDateModule,
    DateTimePickerModule
  ],
})
export class DashboardModule {}
