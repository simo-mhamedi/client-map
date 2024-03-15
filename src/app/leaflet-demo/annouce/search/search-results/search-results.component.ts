import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, ChangeDetectorRef, Input } from '@angular/core';
import { icon, Control,latLng, marker, tileLayer, Map, Layer, LatLng } from 'leaflet';
import { MarkComponent } from 'src/app/map/mark/mark/mark.component';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Gallery } from 'ng-gallery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})



export class SearchResultsComponent implements OnInit {
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer: ViewContainerRef;

  // Leaflet map options
  optionsSpec: any = {
    layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
    zoom: 15,
    center: [46.879966, -121.726909]
  };
  @Input("annoucment") annoucment:any[]=[]
  @Input("area") area
  constructor(private resolver: ComponentFactoryResolver,
	private injector: Injector,
	private announcementService:AnnouncementService,
	private cdr: ChangeDetectorRef,
	private http: HttpClient,
	public gallery: Gallery,
	private router: Router
	) {

  }
  default="../../../../assets/images/user.png"

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
  private apiKey = '7da5abad403646e390234b4a508812be';
  getCoordinates(location: string): Observable<any> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${this.apiKey}`;
    return this.http.get(url);
  }
  // Map reference
  map: Map | undefined;
  getCityName(latitude: number, longitude: number): Observable<any> {
	const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;
	return this.http.get(apiUrl);
  }
  onButtonClick() {
    // Your button click logic goes here
    console.log('Button clicked!');
    // You can perform any actions you need when the button is clicked
  }
  ngOnInit() {
    // Check if the browser supports geolocation
          // Set initial center to the user's location
				this.annoucment.forEach(elm=>{
					const newMarker = marker(
						[elm.latitude, elm.longitude],
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
			// Usage
			const popupContent = `
			<div class="swiper-container" style="width: 100%; overflow-x: auto; display: flex; scroll-snap-type: x mandatory;">
			  <div class="swiper-wrapper" style="display: flex; scroll-snap-type: x mandatory; gap: 5px;">
				${elm.mediaFiles.map(file => `
				  <div class="swiper-slide" style="flex: 0 0 auto; scroll-snap-align: end; box-sizing: border-box; background-color: #f0f0f0; border: 1px solid #ddd;">
					<img src="${file.mediaUrl}" width="130px" height="100px" style="border-radius: 10px;" alt="">
				  </div>
				`).join('')}
			  </div>
			</div>

			<div class="details" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 5px;">
			  <div class="desc" style="font-weight: 530; font-size: 15px; margin-top: 10px; text-align: left;">${elm.description}</div>
			  <div class="prix" style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; gap: 5px; margin-top: 10px; text-align: left;">
				<div class="title" style="font-weight:bold;">Prix :</div>
				<div class="span" >${elm.price} ${elm.currency}</div>
			  </div>
			  <div class="more-details" style="margin-left: auto; margin-right: auto; display: flex; flex-direction: row; align-items: flex-start; justify-content: center; gap: 20px;">
				<div class="left" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 10px;">
				  <div class="prix" style="display: flex; gap:5px;font-weight: bold; font-size: 14px; margin-top: 10px; text-align: left;">
					<div class="title" style="font-weight:bold;">Surface :</div>
					<div class="span">${elm.totalSurface} <span style="font-weight: bold;">m2</span></div>
				  </div>
				  <div class="prix" style="display: flex; gap:5px;font-weight: bold; font-size: 14px; margin-top: 10px; text-align: left;">
					<div class="title"style="font-weight:bold;">Chambre :</div>
					<div class="span">${elm.bedrooms}</div>
				  </div>
				  <div class="prix" style="display: flex; gap:5px;font-weight: bold; font-size: 14px; margin-top: 10px; text-align: left;">
					<div class="title"style="font-weight:bold;">Salon :</div>
					<div class="span">${elm.fairs}</div>
				  </div>
				</div>
				<div class="right" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 10px;">
				  <div class="prix" style="display: flex; gap:5px;font-weight: bold; font-size: 14px; margin-top: 10px; text-align: left;">
					<div class="title" style="font-weight:bold;">Salle de bain :</div>
					<div class="span">${elm.bathrooms}</div>
				  </div>
				</div>
			  </div>
			  <div class="footer" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 20px;">
				<div class="avatar" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px;">
				  <div class="img">
					<img style="width: 30px; border-radius: 100%; height: 30px;" src="${elm.userPhoto || this.default}" alt="">
				  </div>
				  <div class="username">${elm.userName}</div>
				</div>
				<div class="phone" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px;">
				  <div class="whatssap">
					<a target="_blank" href="https://api.whatsapp.com/send?phone=${elm.phone}&text=Hello%20World!">
					  <img style="width: 30px; height: 30px" src="./../../../../assets/images/whatsapp.png" />
					</a>
				  </div>
				  <div class="phone">
					<a target="_blank" href="tel:${elm.phone}">
					  <img style="width: 30px; height: 30px" src="./../../../../assets/images/phone.png" />
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  `;


		  // Now you can use the popupContent variable wherever you need to insert this HTML structure.

						// Bind the custom popup to the marker
						newMarker.bindPopup(popupContent);
						this.markers.push(newMarker);
				})

          this.updateMapOptions();
          this.addMarkerAtCurrentLocation();
  }

  updateMapOptions() {
	this.getCoordinates(this.area).subscribe(
		(data: any) => {
		  const firstResult = data.results[0];
		  const latitude = firstResult.geometry.lat;
		  const longitude = firstResult.geometry.lng;
		  this.center = latLng(latitude,longitude);
		  this.options = {
			layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
			zoom: this.optionsSpec.zoom,
			center: this.center
		  };
		})
    // Update Leaflet options with the new center

  }

  onMapReady(map: Map) {

    // Store the map reference for later use
    this.map = map;
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

			// Custom HTML content for the popup
			const popupContent = "<h6 style='font-weight:bold'>Votre Localisation</h6>"

			// Bind the custom popup to the marker
			newMarker.bindPopup(popupContent);
			this.markers.push(newMarker);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }
}
