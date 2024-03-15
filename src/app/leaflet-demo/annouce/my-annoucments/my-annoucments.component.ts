import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-annoucments',
  templateUrl: './my-annoucments.component.html',
  styleUrl: './my-annoucments.component.scss'
})
export class MyAnnoucmentsComponent {
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
			this.announcementService.getMesAnnouncements(s.id).subscribe(s=>{
				this.annouce=s;
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

	 toggleFavorite(id){

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: "btn btn-success",
			  cancelButton: "btn btn-danger"
			},
			buttonsStyling: false
		  });
		  swalWithBootstrapButtons.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
			  swalWithBootstrapButtons.fire({
				title: "Deleted!",
				text: "Your file has been deleted.",
				icon: "success"
			  });
				this.announcementService.deleteAnnoucment(id).subscribe(v=>{
					this.auth.account().subscribe(s=>{
						this.announcementService.getMesAnnouncements(s.id).subscribe(s=>{
							this.annouce=s;
						})
				})
			  })
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  swalWithBootstrapButtons.fire({
				title: "Cancelled",
				text: "Your imaginary file is safe :)",
				icon: "error"
			  });
			}
		  });
	}
}
