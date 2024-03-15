import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icon, Control,latLng, marker, tileLayer, Map, Layer, LatLng } from 'leaflet';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { AnnouncementDto, AnnouncementType } from 'src/app/auth/models/Announcement';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Helper } from 'src/app/helper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
	ages: string[] = ['Neuf']
	currencies: string[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'NOK', 'SGD', 'MXN', 'HKD', 'TRY', 'INR', 'BRL', 'ZAR', 'RUB', 'AED'];
	isUserData=true;
	isMapData=false;
	isDetailsData=false;
	isPhotosData=false;
	categorys:any[]
	isWind=false;
	key;
    selectedCategory:any;
	test:number
	annoucment:any[]=[]
	locations: any;
	showDropdown=false;
	rangeValues: number[] = [40, 90];
	isSearchIt=false;
	announcementDto:any;
	isAsk=false;
	constructor(private http: HttpClient,
		private router: Router,
		private announcementService:AnnouncementService,
		private auth:AuthService,
		private messageService: MessageService) {}
    uploadedFiles: any[] = [];

  private apiKey = '7da5abad403646e390234b4a508812be';
  getCoordinates(location: string): Observable<any> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${this.apiKey}`;
    return this.http.get(url);
  }
	 // Leaflet map options
	 optionsSpec: any = {
		layers: [{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="http://osm.org/copyright"></a> contributors' }],
		zoom: 15,
		center: [46.879966, -121.726909]
	  };
	query
	  // Leaflet bindings
	  zoom: number = this.optionsSpec.zoom;
	  center: LatLng = latLng(this.optionsSpec.center);
	  options: any = {
		layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
		zoom: this.optionsSpec.zoom,
		center: this.center
	  };

	  // Form bindings
	  formZoom: number = this.zoom;
	  zoomLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	  lat: number = this.center.lat;
	  lng: number = this.center.lng;

	  // Output binding for center
	  onCenterChange(center: LatLng) {
		setTimeout(() => {
		  this.lat = center.lat;
		  this.lng = center.lng;
		});
	  }

	  onZoomChange(zoom: number) {
		setTimeout(() => {
		  this.formZoom = zoom;
		});
	  }

	  doApply() {
		this.center = latLng(this.lat, this.lng);
		this.zoom = this.formZoom;
	  }

	  // Map reference
	  map: Map | undefined;

	  autocomplete(query: string): Observable<any> {
		const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${this.apiKey}`;
		return this.http.get(url);
	  }
	  getCityName(latitude: number, longitude: number): Observable<any> {
		const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;

		return this.http.get(apiUrl);
	  }
	  onLocationChange(query: string): void {
		this.showDropdown = true; // Show the dropdown when there is input

		this.autocomplete(query).subscribe(
		  (data: any) => {
			this.locations = data.results;
		  },
		  (error) => {
			console.error('Error fetching locations:', error);
		  }
		);
	  }

	  onLocationSelect(place: any) {
		// Handle the selected location
		console.log('Selected Place:', place);
	  }

	  ngOnInit() {

		this.announcementService.getAllCategorys(100,0).subscribe(s=>{
            this.categorys=s;
        });


	  }

	updateMapOptions() {
		// Update Leaflet options with the new center
		this.center = latLng(this.optionsSpec.center);
		this.options = {
		  layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
		  zoom: this.optionsSpec.zoom,
		  center: this.center
		};

	  }

	  onMapReady(map: Map) {
		// Store the map reference for later use
		this.map = map;

	  }


	  searchLocation(query) {
		this.query=query
		this.showDropdown=false
		this.getCoordinates(query).subscribe(
			(data: any) => {
			  const firstResult = data.results[0];
			  const latitude = firstResult.geometry.lat;
			  const longitude = firstResult.geometry.lng;
			  this.getCityName( firstResult.geometry.lat, firstResult.geometry.lng).subscribe(s=>{
			this.key=s.results[0].components.region
			})
			  this.optionsSpec.center = [latitude, longitude];
			  this.updateMapOptions()
			},
			(error) => {
			  console.error('Error fetching coordinates:', error);
			}
		  );
	  }

	  back()
	  {
		this.router.navigateByUrl("/home");
	  }
	  toMap()
	  {
		console.log("ss");
		var announcementType
		if(this.isWind)
		{
			announcementType=AnnouncementType.wind
		}
		else{
			announcementType=AnnouncementType.ask
		}
		if(this.announcementDto==null && this.query==null)
		{
			const helper = new Helper("please select category and enter the address");
			helper.showAlert();
		}
		else{

			this.announcementService
			.getAnnouncementsByFilter
			(this.selectedCategory.id,
				this.key,this.rangeValues[1],this.rangeValues[0],
				announcementType).subscribe(s=>{
						this.annoucment=s
						this.isSearchIt=true
				})
		}
	  }
	  isWindFunc(){
		console.log("ed");
		this.isAsk=false;
	  }
	  isAskFunc(){
		this.isWind=false;
	  }
}
