import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletDemoComponent } from './map/leaflet-demo.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegsiterComponent } from './auth/regsiter/regsiter.component';
import { CreateAnnouceComponent } from './leaflet-demo/annouce/create-annouce/create-annouce.component';
import { MarkComponent } from './map/mark/mark/mark.component';
import { SeeOnMapComponent } from './leaflet-demo/annouce/see-on-map/see-on-map.component';
import { SearchComponent } from './leaflet-demo/annouce/search/search.component';
import { FavorComponent } from './leaflet-demo/annouce/favor/favor.component';
import { AnnouceInfosComponent } from './leaflet-demo/annouce/annouce-infos/annouce-infos.component';
import { MyAnnoucmentsComponent } from './leaflet-demo/annouce/my-annoucments/my-annoucments.component';
import { ProfileUserComponent } from './leaflet-demo/user/profile/profile-user/profile-user.component';
import { LandingPageComponent } from './leaflet-demo/landing-page/landing-page/landing-page.component';


const routes: Routes = [
	{
		path: 'home',
		component: LeafletDemoComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'favor',
		component: FavorComponent,
	},
	{
		path: 'annoucments',
		component: MyAnnoucmentsComponent,
	},
	{
		path: 'annouce/:id',
		component: AnnouceInfosComponent,
	  },
	  {
		path: 'user',
		component: ProfileUserComponent,
	  },
	{
		path: 'register',
		component: RegsiterComponent,
	},
	{
		path: 'create-annouce',
		component: CreateAnnouceComponent,
	},
	{
		path: 'map-infos',
		component: SeeOnMapComponent,
	}
	,
	{
		path: 'search',
		component: SearchComponent,
	}	,
	{
		path: '',
		component: LandingPageComponent,
	}
]
@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
		  scrollPositionRestoration: 'top',
		  initialNavigation: 'enabledBlocking'
		})
	  ],
	  exports: [RouterModule]
  })
export class AppRoutingModule { }
