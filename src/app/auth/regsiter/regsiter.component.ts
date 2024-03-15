import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/User';
import { Helper } from 'src/app/helper';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ResponseBack } from '../models/ResponseBack';

@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrl: './regsiter.component.scss'
})
export class RegsiterComponent {
	user=new User()
	sidebarVisible=false;
	rememberMe=false;

    constructor(
        public authService:AuthService,private router: Router) { }
        register() {
            if (
				!this.user.username ||
				!this.user.email ||
				!this.user.phone ||
				!this.user.password ||
				!this.user.confirmPassword
			) {
				// Show SweetAlert or handle the empty fields scenario
				const helper = new Helper('Please fill in all the required fields');
				helper.showAlert();
				return;
			}

			// Check if passwords match
			if (this.user.password !== this.user.confirmPassword) {
				// Handle password mismatch, show an error message, etc.
				const helper = new Helper('Passwords do not match');
				helper.showAlert();
				return;
			}

			// Continue with registration logic
			this.authService.register(this.user).subscribe(
				(response) => {
					console.log(response);
					this.handleRegistrationResponse(response);

					if (this.rememberMe && response !== ResponseBack.emailAlreadyRegistered) {
						this.storeCredentialsLocally(this.user);
					}
				},
				(error) => {
					console.error('Registration error:', error);
					// Add error handling logic here if needed
				}
			);
        }
        private storeCredentialsLocally(user: User): void {
            // Use a secure method to store user credentials locally (e.g., in a cookie or local storage)
            // Example using local storage:
            localStorage.setItem('rememberedUser', JSON.stringify(user));
          }

        private handleRegistrationResponse(response: ResponseBack): void {
            switch (response) {
                case ResponseBack.emailAlreadyRegistered:
                    this.handleEmailAlreadyRegistered();
                    break;
                default:
                    this.navigateToLoginPage();
                    break;
            }
        }

        private handleEmailAlreadyRegistered(): void {
            const helper = new Helper('Email Already Registered');
            helper.showAlert();
            // Additional actions for email already registered scenario
        }

        private navigateToLoginPage(): void {
            this.router.navigateByUrl('/login');
        }
}
