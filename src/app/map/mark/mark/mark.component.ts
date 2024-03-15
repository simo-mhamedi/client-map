// ... (imports)

import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Gallery } from 'ng-gallery';
import { OwlOptions } from "ngx-owl-carousel-o";
import { filter } from "rxjs";
import { AnnouncementDto } from "src/app/auth/models/Announcement";
import { AnnouncementService } from "src/app/service/announcement.service";
import Swiper from 'swiper';

@Component({
	selector: 'app-mark',
	templateUrl: './mark.component.html',
	styleUrls: ['./mark.component.scss'],
  })
  export class MarkComponent  {
	default="../../../../assets/images/user.png"
	limit: number = 10; // <==== Edit this number to limit API results
	customOptions: OwlOptions = {
	  loop: true,
	  autoplay: true,
	  center: true,
	  dots: false,
	  autoHeight: true,
	  autoWidth: true,
	  responsive: {
		0: {
		  items: 1,
		},
		600: {
		  items: 1,
		},
		1000: {
		  items: 1,
		}
	  }
	}
	responsiveOptions: any[] | undefined;
	@Input() lat: any;
	@Input() lan: any;
	sss = "sss";
	id;
	annouce = new AnnouncementDto();
	medias: any[] = [];
	displayCustom=false;
    activeIndex: number = 0;
	currentRoute: string;

	constructor(
	  private announcementService: AnnouncementService,
	  private injector: Injector,
	  private cdr: ChangeDetectorRef,
	  private router: Router,
	  public gallery: Gallery
	) {}


	  imageClick(index: number) {
		console.log(index);

        this.activeIndex = index;
        this.displayCustom = true;
    }
	  async ngOnInit() {
		const mySwiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			spaceBetween: 10,
		  });
		try {
		if(this.router.url==="/map-infos")
		{
			var lat=localStorage.getItem('latitude');
			var lan=localStorage.getItem('longitude');
			const annouce = await this.announcementService.getAnnouncementByLanAndLon(lat,lan).toPromise();
			this.medias = annouce.mediaFiles;
			this.annouce = annouce;
			this.cdr.detectChanges();
		}
		else{


		}

		} catch (error) {
		  console.error('Error fetching announcement:', error);
		}

		this.responsiveOptions = [
			{
				breakpoint: '1199px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '767px',
				numVisible: 3,
				numScroll: 3
			}
		];


	  }


	getPopupContent(id?) {
		this.id=id;
		const annouce =  this.announcementService.getAnnouncementByPosition(id).subscribe(s=>{
			this.annouce=s
		});
	  const factory = this.injector
		.get(ComponentFactoryResolver)
		.resolveComponentFactory(MarkComponent);
	  const componentRef = factory.create(this.injector);

	  // Ensure Angular change detection is triggered
	  componentRef.changeDetectorRef.detectChanges();

	  return componentRef.location.nativeElement;
	}
  }

