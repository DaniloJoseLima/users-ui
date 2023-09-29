import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { User } from 'app/models/user';
import { UserParams } from 'app/models/userParams';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'app-id': environment.appId
    }),
  };

  constructor(
    private http: HttpClient
  ) { }

  public created(user: User): Observable<any> {
    return this.http.post(`${environment.baseUrl}/user/create`, user, this.httpOptions);
  }

  public update(user: User): Observable<any> {
    return this.http.put(`${environment.baseUrl}/user/${user.id}`, user, this.httpOptions);
  }
  public delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/user/${id}`, this.httpOptions);
  }

  public findAll(userParams: UserParams): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user?limit=${userParams.limit}&page=${userParams.page}`, this.httpOptions);
  }

  public findById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/${id}`, this.httpOptions);
  }

}
