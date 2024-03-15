import { Component, NgZone } from '@angular/core';
import { User } from '../models/User';
import { Helper } from 'src/app/helper';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
	user=new User()
	sidebarVisible=false;
	valCheck: string[] = ['remember'];
    password!: string;
    constructor(
        public authService:AuthService,private router: Router,private _ngZone: NgZone) { }




		login() {
		if (
			!this.user.email ||
			!this.user.password
		) {
			// Show SweetAlert or handle the empty fields scenario
			const helper = new Helper('Please fill in all the required fields');
			helper.showAlert();
			return;
		}
        this.authService.login(this.user).subscribe(s=>{

			switch (s) {
				case "userNotFound":
					this.handleMessage("user not Found");
					break;
				case "Unauthorized":
					this.handleMessage("Unauthorized");
					break;
				case "wrongPassword":
					this.handleMessage("wrong Password");
					break;
				default:
					localStorage.setItem('authToken', s);
					this.getAccess();
					break;
			}



    },error=>{
        console.log(error.error);

        var m = String(error.error);



    });
    }

    private handleMessage(m): void {
        const helper = new Helper(m);
        helper.showAlert();
        // Additional actions for email already registered scenario
    }

    private getAccess(): void {
        this.router.navigateByUrl('/home');
    }


}
