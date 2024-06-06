import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
@Input() sideNavStatus:boolean = true;
list = [
  {
    number: '1',
    name: 'DashBoard',
    icon: '/assets/dashboard.png',
    path: '/dashboard/main-content'
  },
  {
    number: '2',
    name: 'Projects',
    icon: '/assets/project.png',
    path: '/projects'
  },
  {
    number: '3',
    name: 'Tasks',
    icon: '/assets/Task.png',
    path: '../../Dashboard/dashboard/tasks'
  },
  {
    number: '4',
    name: 'Kanban',
    icon: '/assets/kanban.png',
    path: '/kanban'
  },
  {
    number: '5',
    name: 'Calendar',
    icon: '/assets/calendar.png',
    path: '/calendar'
  },
  {
    number: '6',
    name: 'Contacts',
    icon: '/assets/telephone.png',
    path: '/contacts'
  },
  {
    number: '7',
    name: 'Message',
    icon: '/assets/chat (1).png',
    path: '/messages'
  },
  {
    number: '8',
    name: 'Products',
    icon: '/assets/product.png',
    path: '/products'
  },
  {
    number: '9',
    name: 'Invoices',
    icon: '/assets/invoice.png',
    path: '/invoices'
  },
  {
    number: '10',
    name: 'File Browser',
    icon: '/assets/folder.png',
    path: '/files'
  }
];

}
