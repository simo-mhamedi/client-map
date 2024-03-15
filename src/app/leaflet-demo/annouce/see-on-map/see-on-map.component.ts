import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, ChangeDetectorRef } from '@angular/core';
import { icon, Control,latLng, marker, tileLayer, Map, Layer, LatLng } from 'leaflet';
import { MarkComponent } from 'src/app/map/mark/mark/mark.component';
import { AnnouncementService } from 'src/app/service/announcement.service';
import { Gallery } from 'ng-gallery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-on-map',
  templateUrl: './see-on-map.component.html',
  styleUrl: './see-on-map.component.scss'
})
export class SeeOnMapComponent {
	@ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer: ViewContainerRef;

	// Leaflet map options
	optionsSpec: any = {
		layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
		zoom: 15,
		center: [46.879966, -121.726909]
	  };
	constructor(private resolver: ComponentFactoryResolver,
	  private injector: Injector,
	  private router: Router,
	  private announcementService:AnnouncementService,
	  private cdr: ChangeDetectorRef,
	  public gallery: Gallery
	  ) {

	}


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

	ngOnInit() {
	  // Check if the browser supports geolocation
	  if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
		  (position) => {
			// Set initial center to the user's location
			this.optionsSpec.center = [position.coords.latitude, position.coords.longitude];
			this.updateMapOptions();
			this.addMarkerAtCurrentLocation();
		  },
		  (error) => {
			console.error('Error getting user location:', error);
		  }
		);
	  } else {
		console.error('Geolocation is not supported by your browser');
	  }
	}

	updateMapOptions() {
	  // Update Leaflet options with the new center
	  var lat=localStorage.getItem('latitude');
	  var lan=localStorage.getItem('longitude');
	  this.center = latLng(Number(lat),Number(lan));
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

	markers: Layer[] = [];
	addMarkerAtCurrentLocation() {
			var lat=localStorage.getItem('latitude');
			var lan=localStorage.getItem('longitude');
			const newMarker = marker(
			  [Number(lat),Number(lan)],
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
			  var markComponentInstance = new MarkComponent(
				  this.announcementService,
				  this.injector,
				  this.cdr,
				  this.router,
				  this.gallery
			  );



			  // Save lat and lan in local storage with a unique key
			  // Custom HTML content for the popup
			  const popupContent = markComponentInstance.getPopupContent();

			  // Bind the custom popup to the marker
			  newMarker.bindPopup(popupContent);
			  this.markers.push(newMarker);
		  }

}
