import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DadataAddress} from '../model/dadata/data';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  saveHotel(name: String, description: String, address: DadataAddress): Observable<any> {
    const body = {name: name, description: description, address: address};
    return this.http.post(this.baseUrl.concat('/hotel/create'), body);
  }
}
