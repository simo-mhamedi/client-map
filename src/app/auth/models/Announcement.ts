export class AnnouncementDto {
	id: any;
	categoryId: any;
	category: any;
	addressId: any;
	address: any;
	phone: any;
	mediaFileIds: number[] | null;
	photos: File[];
	mediaFiles: any[];

	bedrooms=0;
	fairs=0;
	bathrooms=0;
	announcementType: AnnouncementType;
	floors=0;
	livingSpace: any;
	latitude: any;
	longitude: any;
	fullAddress: any;
	currency: any;
	totalSurface: any;
	age: any;
	price: any;
	description: any;
	moreDetails: any;
	creationDate: any;
	userPhoto;
	userName;
}

export enum AnnouncementType {
	wind,
	ask
}

