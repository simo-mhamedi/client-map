import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
    apiUrl: string = environment.apiUrl+"Announcement/";

    constructor(private http: HttpClient) {}
	getAllCategorys(page: number,
        skip: number,
        pageSearch?,
        sortField?,
        sortOrder?
      ) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('pageSize', page);
        httpParams = httpParams.append('skip', skip);
        if (sortField) httpParams = httpParams.append('sortField', sortField);
        if (pageSearch) httpParams = httpParams.append('searchText', pageSearch);
        if (sortOrder) httpParams = httpParams.append('sortOrder', sortOrder);
        return this.http.get<any[]>(this.apiUrl+"get-categorys",{
            params: httpParams
          } );
    }
	getAllMoreInfos(page: number,
        skip: number,
        pageSearch?,
        sortField?,
        sortOrder?
      ) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('pageSize', page);
        httpParams = httpParams.append('skip', skip);
        if (sortField) httpParams = httpParams.append('sortField', sortField);
        if (pageSearch) httpParams = httpParams.append('searchText', pageSearch);
        if (sortOrder) httpParams = httpParams.append('sortOrder', sortOrder);
        return this.http.get<any[]>(this.apiUrl+"get-moreInfos",{
            params: httpParams
        });
    }
	save(announcementDto)
    {
        return this.http.post<any>(this.apiUrl+"add-announcement",announcementDto)
    }

	getAnnouncementByPosition(id)
    { let httpParams = new HttpParams();
        httpParams = httpParams.append('id', id);
        return this.http.get<any>(this.apiUrl+"get-announcement-by-position",{
            params: httpParams
          } )
    }
	getAnnouncementByLanAndLon(lat,lon)
    { let httpParams = new HttpParams();
        httpParams = httpParams.append('lat', lat);
        httpParams = httpParams.append('lon', lon);
        return this.http.get<any>(this.apiUrl+"get-announcement-by-params",{
            params: httpParams
        })
    }

	getAnnouncementById(id)
    { let httpParams = new HttpParams();
        httpParams = httpParams.append('id', id);
        return this.http.get<any>(this.apiUrl+"get-announcement",{
            params: httpParams
        })
    }
	getAnnouncementsByAddress(address)
    { let httpParams = new HttpParams();
        httpParams = httpParams.append('address', address);
        return this.http.get<any>(this.apiUrl+"get-Announcements-by-Address",{
            params: httpParams
        })
    }
	getAnnouncementsByFilter(categoryId,address,maxPrice,minPrice,announcementType)
    { let httpParams = new HttpParams();
        httpParams = httpParams.append('CategoryId', categoryId);
        httpParams = httpParams.append('address', address);
        httpParams = httpParams.append('MaxPrice', maxPrice);
        httpParams = httpParams.append('MinPrice', minPrice);
        httpParams = httpParams.append('AnnouncementType', announcementType);
        return this.http.get<any>(this.apiUrl+"get-Announcements-by-filter",{
            params: httpParams
        })
    }
	toggleFavorite(userId: number, announcementId: number): Observable<void> {
		const url = `${this.apiUrl}toggle-favorite`;
		return this.http.post<void>(url, { userId, announcementId });
	  }

	  isFavoriteActive(userId: number, announcementId: number): Observable<boolean> {
		const url = `${this.apiUrl}isFavoriteActive`;
		return this.http.get<boolean>(url, { params: { userId: userId.toString(), announcementId: announcementId.toString() } });
	  }

	  getFavorAnnouncements(userId: number) {
		const url = `${this.apiUrl}getFavorAnnouncements`;
		return this.http.get<any[]>(url, { params: { userId: userId.toString()}});
	  }

	  getMesAnnouncements(userId: number) {
		const url = `${this.apiUrl}getMesAnnouncements`;
		return this.http.get<any[]>(url, { params: { userId: userId.toString()}});
	  }

	  deleteAnnoucment(id: number) {
		let params = new HttpParams();
        params = params.append('announcementId', '' + id);
        return this.http.post(this.apiUrl + "delete-announcement", null, {
            params: params
        });
	  }

}
