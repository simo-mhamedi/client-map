import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
	/**
	 *
	 */
	id
	constructor(
		private authService:AuthService,
		private router: Router){}


	checkUserConnected()
	{
		const authToken = localStorage.getItem('authToken');
		if(authToken!=null)
		{
			return true;
		}
		return false;
	}
	navigateToFavor() {
		this.navigateTo('/favor');
	 }

	 navigateToAnnouncements() {
		this.navigateTo('/annoucments');
	 }

	 navigateToUser() {
		this.navigateTo('/user');
	 }


	 navigateTo(route: string) {
		if (this.checkUserConnected()) {
		   this.router.navigate([route]);
		} else {
		   this.router.navigate(['/login']);
		   // Handle not connected user case (optional)
		}
	 }
}
