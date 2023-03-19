import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../models/Dog';
import { SearchResult } from '../models/SearchResult';
import { Match } from '../models/Match';

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
  dogSearch(breed: string, sort: any, pageSize: number): Observable<SearchResult> {
    let params = new HttpParams().set('size', pageSize)
    
    if (breed && breed !== "") {
      params = params.set('breeds', breed)
    }

    if (sort) {
      params = params.set('sort', sort.field.toLowerCase() + ":" + sort.dir)
    }
    
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

  /**
   * Finds a match from the list of ids
   * @param dogIds 
   * @returns 
   */
  findAMatch(dogIds: Array<string>): Observable<Match> {
    return this.httpClient.post<Match>("/dogs/match", dogIds)
  }
}
