import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../models/Dog';
import { SearchResult } from '../models/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {}


  getDogBreeds(): Observable<any> {
    return this.httpClient.get("/dogs/breeds")
  }

  dogSearch(): Observable<SearchResult> {
    let params = new HttpParams()
    
    // params.set('breeds')

    return this.httpClient.get<SearchResult>("/dogs/search", {params})
  }

  generatedDogSearch(generatedQuery: string): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(generatedQuery)
  }

  getDogs(dogIds: Array<string>): Observable<Array<Dog>> {
    return this.httpClient.post<Array<Dog>>("/dogs", dogIds)
  }
}
