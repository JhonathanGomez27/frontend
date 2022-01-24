import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthenticationService } from '../../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CorralService {

  private api = 'http://localhost:5000/api/corral'

  opcionesHttp: any;

  constructor(
    private http: HttpClient,
    private route: Router,
    private authService: AuthenticationService
    ) {
   }

   //inicio sesion
   getCorrales(token:any): Observable<any>{
    return this.http.get<any[]>(
      this.api
    ).pipe(map(data => data));
   }

   //registro nuevo admin
   getAverageByAge(corral:any): Observable<any>{
    return this.http.post<any[]>(
      this.api + '/average',corral
    ).pipe(map(data => data));
   }

   getAnimalsByCorral(corral: any){
      return this.http.post<any[]>(
        this.api + '/animals',corral
      ).pipe(map(data => data));
   }

   addCorral(corral:any){
      return this.http.post<any[]>(
        this.api ,corral
      ).pipe(map(data => data));
   }
}
