import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AnnouncementDto } from 'src/app/auth/models/Announcement';

@Component({
  selector: 'app-annouce-infos',
  templateUrl: './annouce-infos.component.html',
  styleUrl: './annouce-infos.component.scss'
})
export class AnnouceInfosComponent {

	/**
	 *
	 */
	annouce:AnnouncementDto
	medias:any[]=[];
	default="../../../../assets/images/user.png"
	isFavoriteActive=false
	constructor(
		private auth:AuthService,
		private announcementService:AnnouncementService,
		private route: ActivatedRoute
		) {

	}
	ngOnInit(): void {

		this.route.params.subscribe(params => {
			const id = params['id'];
			this.announcementService.getAnnouncementById(id).subscribe(s=>{
				this.medias = s.mediaFiles;
				this.annouce = s;
				console.log(s);

			})
		  });

		  this.auth.account().subscribe(s=>{
			this.announcementService.isFavoriteActive(s.id,this.annouce.id).subscribe(s=>{
				this.isFavoriteActive=s;

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
	toggleFavorite(){

		this.auth.account().subscribe(s=>{
			this.announcementService.toggleFavorite(s.id,this.annouce.id).subscribe(v=>{
				console.log("done");
				this.announcementService.isFavoriteActive(s.id,this.annouce.id).subscribe(s=>{
					this.isFavoriteActive=s;

				})
			})
		  })
	}

}
