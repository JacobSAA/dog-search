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

  /**
   * Get a list of dog breeds
   * @returns 
   */
  getDogBreeds(): Observable<any> {
    return this.httpClient.get("/dogs/breeds")
  }

  /**
   * Search for dogs with filters and sorting
   * @returns 
   */
  dogSearch(): Observable<SearchResult> {
    let params = new HttpParams()
    
    // params.set('breeds')

    return this.httpClient.get<SearchResult>("/dogs/search", {params})
  }

  /**
   * Using generated queries make a search request
   * @param generatedQuery 
   * @returns 
   */
  generatedDogSearch(generatedQuery: string): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(generatedQuery)
  }

  /**
   * Get dog information from a list of dog ids
   * @param dogIds 
   * @returns 
   */
  getDogs(dogIds: Array<string>): Observable<Array<Dog>> {
    return this.httpClient.post<Array<Dog>>("/dogs", dogIds)
  }
}
