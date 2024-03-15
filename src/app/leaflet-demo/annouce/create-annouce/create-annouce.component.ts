import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icon, Control,latLng, marker, tileLayer, Map, Layer, LatLng } from 'leaflet';
import { Observable, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { AnnouncementDto, AnnouncementType } from 'src/app/auth/models/Announcement';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Helper } from 'src/app/helper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

declare const google: any; // Declare the google namespace

@Component({
  selector: 'app-create-annouce',
  templateUrl: './create-annouce.component.html',
  styleUrl: './create-annouce.component.scss'
})
export class CreateAnnouceComponent {
	ages: string[] = ['neuf','presque neuf', "bien"]
	currencies: string[] = ['MAD','USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'NOK', 'SGD', 'MXN', 'HKD', 'TRY', 'INR', 'BRL', 'ZAR', 'RUB', 'AED'];
	isUserData=true;
	isMapData=false;
	isDetailsData=false;
	isPhotosData=false;
	categorys:any[]
	moreDetails:any[]
	isWind=false;
	isAsk=false;
    selectedCategory:any;
    selectedMoreDetails:any[];
	test:number
	locations: any;
	showDropdown=false;
	announcementDto=new AnnouncementDto();
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
	  back()
	  {
		this.router.navigateByUrl("/home");
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

  increment() {
    // Reverse the logic for increment
    this.announcementDto.bathrooms++;
  }

  decrement() {
    // Reverse the logic for decrement
    this.announcementDto.bathrooms--;
  }
	  ngOnInit() {

		this.announcementService.getAllCategorys(100,0).subscribe(s=>{
            this.categorys=s;
        });
		this.announcementService.getAllMoreInfos(100,0).subscribe(s=>{
            this.moreDetails=s;
        });
		// Check if the browser supports geolocation
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition(
			(position) => {
			  // Set initial center to the user's location
			  this.optionsSpec.center = [position.coords.latitude, position.coords.longitude];
			  this.updateMapOptions();
			  this.addMarkerAtCurrentLocation()
				//searchLayer is a L.LayerGroup contains searched markers
			},
			(error) => {
			  console.error('Error getting user location:', error);
			}
		  );
		} else {
		  console.error('Geolocation is not supported by your browser');
		}
	  }
	  onUpload(event) {

        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
		var data = new FormData();
		// Assuming you have an instance of AnnouncementDto called announcementDto
		// If mediaFiles is an array of File objects, you may need to handle them differently, as FormData doesn't support direct appending of File objects
		this.uploadedFiles.forEach((file, index) => data.append(`photo${index+1}`, file));
		this.auth.account().subscribe(s=>{
			data.append("bedrooms", this.announcementDto.bedrooms+"");
			data.append("userId", s.id+"");
			data.append("categoryId", this.announcementDto.categoryId);
			data.append("category", this.announcementDto.category);
			data.append("address", this.announcementDto.address);
			data.append("phone", this.announcementDto.phone);
			data.append("bedrooms", this.announcementDto.bedrooms+"");
			data.append("fairs", this.announcementDto.fairs+"");
			data.append("bathrooms", this.announcementDto.bathrooms+"");
			data.append("announcementType", this.announcementDto.announcementType+"");
			data.append("floors", this.announcementDto.floors+"");
			data.append("livingSpace", this.announcementDto.livingSpace);
			data.append("latitude", this.announcementDto.latitude);
			data.append("longitude", this.announcementDto.longitude);
			data.append("fullAddress", this.announcementDto.fullAddress);
			data.append("currency", this.announcementDto.currency);
			data.append("totalSurface", this.announcementDto.totalSurface);
			data.append("age", this.announcementDto.age);
			data.append("price", this.announcementDto.price);
			data.append("description", this.announcementDto.description);

			const selectedIdsString = this.selectedMoreDetails.map(info => info.id).join(',');

			data.append("moreDetails", selectedIdsString);
// this.announcementService.save(this.announcement).subscribe(s=>{

		let timerInterval;


		this.announcementService.save(data)
			.pipe(
			finalize(() => {
				this.isDone();
				this.uploadedFiles.length = 0;
				}))
			.subscribe(
			(response) => {
				// Handle successful response
			},
			(error) => {
				// Handle error
			}
			)
		})

		// Now, the FormData object (data) should contain key-value pairs for each property in the AnnouncementDto class


		// })
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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


	  showData(type: string): void {
		this.isUserData = type === 'userData';
		this.isMapData = type === 'mapData';
		this.isDetailsData = type === 'detailsData';
		this.isPhotosData = type === 'photosData';
		if(this.isMapData){
			if (
				!this.announcementDto.categoryId ||
				this.announcementDto.announcementType == null||
				!this.announcementDto.phone
			) {
				// Show SweetAlert or handle the empty fields scenario
				const helper = new Helper('Please fill in all the required fields');
				helper.showAlert();
				this.isUserData = true;
				this.isMapData =false;
				return;
			}
		}
		if(this.isDetailsData){
			if (
				!this.announcementDto.latitude ||
				!this.announcementDto.longitude

			) {
				// Show SweetAlert or handle the empty fields scenario
				const helper = new Helper('Please select location');
				helper.showAlert();
				this.isMapData = true;
				this.isDetailsData =false;
				return;
			}
		}
		if(this.isPhotosData){
			if (
				!this.announcementDto.livingSpace||
				!this.announcementDto.currency||
				!this.announcementDto.totalSurface||
				!this.announcementDto.price||
				!this.announcementDto.description||
				!this.announcementDto.age
			) {
				// Show SweetAlert or handle the empty fields scenario
				const helper = new Helper('Please fill in all the required fields');
				helper.showAlert();
				this.isDetailsData =true;
				this.isPhotosData = false;
				return;
			}
		}
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
				this.announcementDto.fullAddress=s.results[0].components.region
			})
			  this.optionsSpec.center = [latitude, longitude];
			  this.updateMapOptions()
			},
			(error) => {
			  console.error('Error fetching coordinates:', error);
			}
		  );
	  }
	  markers: Layer[] = [];
	  addMarkerAtCurrentLocation() {
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition(
			(position) => {
			  const newMarker = marker(
				[position.coords.latitude, position.coords.longitude],
				{
				  icon: icon({
					iconSize: [25, 41],
					iconAnchor: [13, 41],
					iconUrl: 'assets/leaflet/marker-icon.png',
					iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
					shadowUrl: 'assets/leaflet/marker-shadow.png'
				  })
				}
			  );
			  this.getCityName(position.coords.latitude, position.coords.longitude).subscribe(s=>{
				this.markers.push(newMarker);
				this.announcementDto.latitude=position.coords.latitude
				this.announcementDto.longitude=position.coords.longitude
				this.announcementDto.fullAddress=s.results[0].components.region
			  })
			},
			(error) => {
			  console.error('Error getting user location:', error);
			}
		  );
		} else {
		  console.error('Geolocation is not supported by your browser');
		}
	  }
	  onMapClick(event: any) {
		console.log("ssss");

		const clickedLatLng: LatLng = event.latlng;
		// Remove the last clicked marker, if any
		if (this.markers.length > 0) {
		  const lastMarker = this.markers.pop();
		  lastMarker.removeFrom(this.map); // Remove the marker from the map
		}
		// Add a marker at the clicked location
		const newMarker = marker([clickedLatLng.lat, clickedLatLng.lng], {
		  icon: icon({
			iconSize: [25, 41],
			iconAnchor: [13, 41],
			iconUrl: 'assets/leaflet/marker-icon.png',
			iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
			shadowUrl: 'assets/leaflet/marker-shadow.png'
		  })
		});
		this.getCityName(clickedLatLng.lat, clickedLatLng.lng).subscribe(s=>{
			this.announcementDto.fullAddress=s.results[0].components.region
		})
		this.markers.push(newMarker);
		this.announcementDto.latitude=clickedLatLng.lat
		this.announcementDto.longitude=clickedLatLng.lng
		this.optionsSpec.center = [clickedLatLng.lat, clickedLatLng.lng];
		this.updateMapOptions();
	  }
	  toMap(){
		if(this.selectedCategory)
		{
			this.announcementDto.categoryId=this.selectedCategory.id;
		}
		if(this.isWind)
		{
			this.announcementDto.announcementType=AnnouncementType.wind
		}
		else{
			this.announcementDto.announcementType=AnnouncementType.ask
		}
		if (
			!this.announcementDto.categoryId ||
			this.announcementDto.announcementType == null||
			!this.announcementDto.phone
		) {
			// Show SweetAlert or handle the empty fields scenario
			const helper = new Helper('Please fill in all the required fields');
			helper.showAlert();
			return;
		}
		this.isUserData=false
		this.isMapData=true
	  }

	  toDetails(){
		if (
			!this.announcementDto.latitude ||
			!this.announcementDto.longitude

		) {
			// Show SweetAlert or handle the empty fields scenario
			const helper = new Helper('Please select location');
			helper.showAlert();
			return;
		}
		this.isMapData=false
		this.isDetailsData=true
	  }
	  toPhotos(){
		if (
			!this.announcementDto.livingSpace||
			!this.announcementDto.currency||
			!this.announcementDto.totalSurface||
			!this.announcementDto.price||
			!this.announcementDto.description||
			!this.announcementDto.age
		) {
			// Show SweetAlert or handle the empty fields scenario
			const helper = new Helper('Please fill in all the required fields');
			helper.showAlert();
			return;
		}
		this.isDetailsData=false
		this.isPhotosData=true
	  }
	  isDone()
	  {
		Swal.fire({
			text: "Votre bien a été positioné  avec succés",
			icon: "success",
			showCancelButton: true,
			confirmButtonColor: "#42B8BF",
			cancelButtonColor: "green",
			confirmButtonText: "Déposer une annonce",
			cancelButtonText: "Voir sur Map",
		  }).then((result) => {
			if (result.isConfirmed) {
				this.isUserData=true;
				this.isMapData=false;
				this.isDetailsData=false;
				this.isPhotosData=false;
				this.announcementDto=new AnnouncementDto();
				this.selectedCategory=null;
			}
			else{
				this.seeOnMap();
			}
		  });
	  }
	  seeOnMap()
	  {
		localStorage.setItem('latitude', this.announcementDto.latitude);
		localStorage.setItem('longitude', this.announcementDto.longitude);
		this.router.navigateByUrl("map-infos");
	  }
	  isWindFunc(){
		console.log("ed");
		this.isAsk=false;
	  }
	  isAskFunc(){
		this.isWind=false;
	  }
}
