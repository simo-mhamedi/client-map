import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Helper } from 'src/app/helper';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
	sidebarVisible=false;
	id
	defaultImg="./../../../assets/images/user.png";
	user;
	constructor(
		private auth:AuthService,
		private router: Router){}

		ngOnInit(): void {
			this.auth.account().subscribe(s=>{
				this.user=s;
			})
		}

	checkUserConnected()
	{
		const authToken = localStorage.getItem('authToken');
		if(authToken!=null)
		{
			return true;
		}
		return false;
	}
	search()
	{
		if (this.router.url === "/search") {
			location.reload();
		}

	  this.router.navigateByUrl("search");
	}
	create()
	{
		const authToken = localStorage.getItem('authToken');
		if(authToken!=null)
		{
			this.router.navigateByUrl("/create-annouce");
		}
		else{
			this.router.navigateByUrl("/login");
		}

	}
	logOut(){
		localStorage.clear();
		this.router.navigateByUrl('/auth/login')
	}
}
