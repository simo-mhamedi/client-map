import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './auth/login/login.component';
import { SidebarModule } from 'primeng/sidebar';
import { RegsiterComponent } from './auth/regsiter/regsiter.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LeafletDemoComponent } from './map/leaflet-demo.component';
import { LeafletCoreDemoComponent } from './map/core/core-demo.component';
import { LeafletModule } from 'projects/ngx-leaflet/src/public-api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CreateAnnouceComponent } from './leaflet-demo/annouce/create-annouce/create-annouce.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MarkComponent } from './map/mark/mark/mark.component';
import { GalleriaModule } from 'primeng/galleria';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { GalleryModule } from 'ng-gallery';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SeeOnMapComponent } from './leaflet-demo/annouce/see-on-map/see-on-map.component';
import { SearchComponent } from './leaflet-demo/annouce/search/search.component';
import { SliderModule } from 'primeng/slider';
import { SearchResultsComponent } from './leaflet-demo/annouce/search/search-results/search-results.component';
import { FavorComponent } from './leaflet-demo/annouce/favor/favor.component';
import { AnnouceInfosComponent } from './leaflet-demo/annouce/annouce-infos/annouce-infos.component';
import { MyAnnoucmentsComponent } from './leaflet-demo/annouce/my-annoucments/my-annoucments.component';
import { ProfileUserComponent } from './leaflet-demo/user/profile/profile-user/profile-user.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
	declarations: [
		AppComponent,SearchResultsComponent,LoginComponent,RegsiterComponent,MarkComponent,SearchComponent,	SeeOnMapComponent,DashboardComponent,LeafletDemoComponent,LeafletCoreDemoComponent,
		FooterComponent,CreateAnnouceComponent,
		FavorComponent,AnnouceInfosComponent,
		MyAnnoucmentsComponent,ProfileUserComponent
	],
	imports: [
		CommonModule,
		CarouselModule ,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
		SidebarModule,
		RadioButtonModule,
		BrowserModule,
		InputNumberModule,
		RouterModule,
		CarouselModule,
		AppRoutingModule,
		DropdownModule,
		SlickCarouselModule,
		HttpClientModule,
		InputTextareaModule,
		LeafletModule,
		BrowserAnimationsModule	,
		ChipsModule,
		MultiSelectModule,
		FileUploadModule,
		ToastModule,
		GalleriaModule,
		GalleryModule,
		SliderModule
	],
	providers: [MessageService,{
		provide: GALLERY_CONFIG,
		useValue: {
		  autoHeight: true,
		  imageSize: 'cover'
		} as GalleryConfig
	  }],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
