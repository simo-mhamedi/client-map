import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/auth/models/User';
import { Helper } from 'src/app/helper';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent implements OnInit  {
	/**
	 *
	 */
	id
	constructor( private authService:AuthService,
		private route: ActivatedRoute
		) {}
	statuses: any[] = [];

	ngOnInit(): void {
		this.authService.account().subscribe(s=>{
			this.id=s.id;
			this.getUserById(this.id);
		}
		)
        this.statuses = [
            { label: 'Admin', value: 'Admin' },
            { label: 'User', value: 'User' },
        ];
	}
    user=new User();
	defaultImg="./../../../assets/images/user.png";
    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    userPhoto:any;
    selectedProducts: User[] = [];

    submitted: boolean = false;
    imageUrl: any;
	productDialog: boolean;
	onBasicUploadAuto(event: any) {
		console.log(event);

        const file: File = event.files[0];
        if (file) {

            const reader = new FileReader();
            this.user.profileImage=file;



        reader.onload = (e: any) => {
          // Set the image URL to the data URL
          this.imageUrl = e.result;
        };
        reader.readAsDataURL(file);
      }
      }

	hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

	updateUser() {
        this.submitted=true
        const formData: FormData = new FormData();
		console.log(this.user);

        if(this.user.profileImage){
            formData.append('ProfileImage', this.user.profileImage, this.user.profileImage.name);
        }
		formData.append('Id', this.user.id+"");
        formData.append('Username', this.user.username);
        formData.append('Email', this.user.email);
        formData.append('Phone', this.user.phone);
        this.submitted = true;
        this.authService.updateUser(formData).subscribe(s=>{
			this.getUserById(this.user.id);

				Swal.fire({
					icon: "success",
					text: "user was successfully updated"
				});



        })
    }
	private handleEmailAlreadyRegistered(): void {
        const helper = new Helper('Email Already Registered');
        helper.showAlert();
    }

	getUserById(userId){
        this.authService.getUserById(userId).subscribe(s=>{
            this.user=s
            this.imageUrl=this.user.profileImageUrl
        })
      }
}
