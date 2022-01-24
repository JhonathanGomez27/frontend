import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private api = 'http://localhost:5000/api/animal'

  constructor(
    private http: HttpClient
  ) { }

  
  getAllAnimals(): Observable<any>{
    return this.http.get<any[]>(
      this.api
    ).pipe(map(data => data));
  }

  addAnimal(animal:any):Observable<any>{
    return this.http.post<any[]>(
      this.api,animal
    ).pipe(map(data => data));
  }
}
