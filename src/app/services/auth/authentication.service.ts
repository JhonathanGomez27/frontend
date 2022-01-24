import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = 'http://localhost:5000/api/user'

  constructor(
    private http: HttpClient,
    private route: Router) {
   }

   //inicio sesion
   login(user: any): Observable<any>{
    return this.http.post<any[]>(
      this.api + '/login', user
    ).pipe(map(data => data));
   }
   //registro nuevo admin
   register(user: any): Observable<any>{
    return this.http.post<any[]>(
      this.api + '/register', user
    ).pipe(map(data => data));
   }

   isLogged(){
     return !!localStorage.getItem('token');
   }

   getToken(){
     return localStorage.getItem('token');
   }

   logOut(){
     localStorage.removeItem('token');
     this.route.navigate(['/auth']);
   }
}
