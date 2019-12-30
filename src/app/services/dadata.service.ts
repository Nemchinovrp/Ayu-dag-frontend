import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DadataAddressResponse} from '../model/dadata/dadata-response';
import {Locations} from '../model/dadata/dadata-config';

export enum DadataType {
  address = 'address'
}

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  // return this.http.get('http://localhost:8080/address?query='.concat(value));
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:max-line-length
  getData(value: string, type: DadataType, count: number = 3, locations: Locations[] = null): Observable<DadataAddressResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token '.concat('557762d22953ab8c96a591102cd51efffe734e91'),
      })
    };
    const body = Object.assign({query: value, count, locations});
    return this.http.post<DadataAddressResponse>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + type, body, httpOptions);
  }
}
