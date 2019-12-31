// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import {BehaviorSubject, Observable} from 'rxjs';
// @ts-ignore
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Transaction} from '../model/transaction';
// @ts-ignore
import {Hotel} from '../model/Hotel';
import { environment } from '../../environments/environment';

let API_URL = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});

    return this.http.get<any>(API_URL + 'login', {headers: headers})
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + 'logout', {})
      .pipe(map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'registration', JSON.stringify(user),
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  findAllProducts(): Observable<any> {
    return this.http.get(API_URL + 'products',
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  purchaseProduct(transaction: Transaction): Observable<any> {
    return this.http.post(API_URL + 'purchase', JSON.stringify(transaction),
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  testBackend(): Observable<string> {
    console.log("service - method");
    // @ts-ignore
    return this.http.get<Hotel>(this.baseUrl + '/test',
      {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }
}
