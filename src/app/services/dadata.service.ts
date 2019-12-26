import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DadataResponse} from '../model/dadata/dadata-response';

export enum DadataType {
  fio = 'fio',
  address = 'address',
  party = 'party',
  bank = 'bank',
  email = 'email'
}

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  // return this.http.get('http://localhost:8080/address?query='.concat(id));
  constructor(private http: HttpClient) { }

  getData(value: string): Observable<DadataResponse> {

    // @ts-ignore
    return this.http.get('http://localhost:8080/address?query='.concat(value));
  }
}
