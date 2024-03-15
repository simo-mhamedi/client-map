import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseBack } from './models/ResponseBack';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl+"Auth/";
  AdminApiUrl: string = environment.apiUrl+"UserAdmin/";

  private authToken: string | null = null;
  private loginStatus = new BehaviorSubject<boolean>(this.loggedIn())
  private username = new BehaviorSubject<string>(localStorage.getItem('username')!)

  constructor(private http: HttpClient,
    private router: Router
    ) {}

  public register(user: any): Observable<any> {
    return this.http.post<ResponseBack>(
      this.apiUrl+"register",
      user
    );
  }
  public addNewUser(user: any): Observable<any> {
    return this.http.post<ResponseBack>(
      this.apiUrl+"addNewUser",
      user
    );
  }
  public updateUser(user: any): Observable<any> {
    return this.http.post<ResponseBack>(
      this.AdminApiUrl+"update-client",
      user
    );
  }
  getUserById(userId){
	let params = new HttpParams();
	params = params.append('userId', '' + userId);

	return this.http.get<any>(this.AdminApiUrl + "get-user",{
	  params: params
	});
}
  public login(user: any): Observable<string> {
    return this.http.post(this.apiUrl+"login", user, {
      responseType: 'text',
    });
  }
  setAuthToken(token: string) {
    this.authToken = token;
  }
  getAuthToken(): string | null {
    return this.authToken;
  }

  logOut()
  {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }
  public signOutExternal = () => {
	localStorage.removeItem("token");
	console.log("token deleted")
}

LoginWithGoogle(credentials: string): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.post(this.apiUrl + "LoginWithGoogle", JSON.stringify(credentials), { headers: header, withCredentials: true });
}

LoginWithFacebook(credentials: string): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.post(this.apiUrl + "LoginWithFacebook", JSON.stringify(credentials), { headers: header, withCredentials: true });
}



getClient(): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.get(this.apiUrl + "GetColorList", { headers: header, withCredentials: true });
}


refreshToken(): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.get(this.apiUrl + "RefreshToken", { headers: header, withCredentials: true });
}

revokeToken(): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.delete(this.apiUrl + "RevokeToken/" + this.username.value, { headers: header, withCredentials: true });
}

saveToken(token:string) {
  localStorage.setItem('token', token)
}

saveUsername(username:string) {
  localStorage.setItem('username', username)
}

loggedIn(): boolean {
  if (localStorage.getItem('token')) {
	return true;
  }
  return false;
}

setLoginStatus(val:any) {
  this.loginStatus.next(val)
}

setUsername(val:any) {
  this.username.next(val)
}

account(){
	// Check if 'token' is present in localStorage
	// Token is present, decode it to get user information
	var token = localStorage.getItem('authToken');
	  // Assuming the token is a JW
	  var decodedToken = jwt_decode.jwtDecode(token);
	  const nameClaim = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
	  // Output the extracted value
	  console.log('Name:', nameClaim);
	  let httpParams = new HttpParams();
	  httpParams = httpParams.append('email', nameClaim);
	  return this.http.get<any>(this.apiUrl+"get-user-details",{
		params: httpParams
	  })
}
}
