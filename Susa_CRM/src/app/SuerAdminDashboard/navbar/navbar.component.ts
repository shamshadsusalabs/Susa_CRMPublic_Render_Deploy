import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchText!: string;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = true;
  showSearch = false;
constructor(private router:Router){}

  toggleSearch(event: MouseEvent): void {
    event.stopPropagation();
    console.log("Search toggled");
    this.showSearch = !this.showSearch;
  }

  SideNavToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  logout(event1: MouseEvent): void {
    event1.stopPropagation(); // Stops the event from bubbling up to other elements
    localStorage.clear(); // Clears all data from local storage
    this.router.navigate(['/Authentication/SignIn']); // Navigates to the sign-in page
  }
}
