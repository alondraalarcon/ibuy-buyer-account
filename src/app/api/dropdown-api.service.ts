import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownApiService {
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http
      .get('http://66.113.235.103/api/countries')
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllBusinessCategory() {
    return this.http
      .get('http://66.113.235.103/api/business-categories')
      .pipe(retry(2), catchError(this.handleError));
  }

  getRegionByCountry(countryId) {
    return this.http
      .get('http://66.113.235.103/api/region/' + countryId)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProvinceByRegion(regionId) {
    return this.http
      .get('http://66.113.235.103/api/provinces/' + regionId)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCitiesByProvince(provinceId) {
    return this.http
      .get('http://66.113.235.103/api/cities/' + provinceId)
      .pipe(retry(2), catchError(this.handleError));
  }

  getBarangayByCity(barangayId) {
    return this.http
      .get('http://66.113.235.103/api/barangay/' + barangayId)
      .pipe(retry(2), catchError(this.handleError));
  }
}
