import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class CentroServiceService {
  constructor(private http: HttpClient) { }

  getAllCentros(): Observable<any> {
    return this.http.get<any>('https://super-crud.herokuapp.com/pokemon')
  }

}
