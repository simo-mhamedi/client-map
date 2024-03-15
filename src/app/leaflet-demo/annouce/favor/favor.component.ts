import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementDto } from 'src/app/auth/models/Announcement';

@Component({
  selector: 'app-favor',
  templateUrl: './favor.component.html',
  styleUrl: './favor.component.scss'
})
export class FavorComponent {
	constructor(
		private auth:AuthService,
		private announcementService:AnnouncementService,
		private router: Router
		) {

	}
	annouce:any[]
	medias:any[]=[];
	default="../../../../assets/images/user.png"
	isFavoriteActive=false
	ngOnInit(): void {



		  this.auth.account().subscribe(s=>{
			this.announcementService.getFavorAnnouncements(s.id).subscribe(s=>{
				this.annouce=s;
			})
		  })

	}
	toggleFavorite(id){

		this.auth.account().subscribe(s=>{
			this.announcementService.toggleFavorite(s.id,id).subscribe(v=>{
				this.auth.account().subscribe(s=>{
					this.announcementService.getFavorAnnouncements(s.id).subscribe(s=>{
						this.annouce=s;
					})
				  })
			})
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
	navigateToFavor() {
		this.navigateTo('/favor');
	 }

	 navigateToAnnouncements() {
		this.navigateTo('/annoucments');
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
