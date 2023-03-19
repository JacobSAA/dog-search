import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {}


  getDogBreeds() {
    this.httpClient.get("/dogs/breeds").subscribe(data => console.log(data))
  }
}
