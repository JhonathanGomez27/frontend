import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private api = 'http://localhost:5000/api/type'

  constructor(
    private http: HttpClient
  ) { }

  
  getTypes(): Observable<any>{
    return this.http.get<any[]>(
      this.api
    ).pipe(map(data => data));
  }

  addType(type:any):Observable<any>{
    return this.http.post<any[]>(
      this.api,type
    ).pipe(map(data => data));
  }
}
