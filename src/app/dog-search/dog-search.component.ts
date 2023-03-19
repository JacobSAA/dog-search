import { Component, EventEmitter, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import { MatSelectChange } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
import { Dog } from '../models/Dog';
import { SearchResult } from '../models/SearchResult';
import { query } from '@angular/animations';

@Component({
  selector: 'app-dog-search',
  templateUrl: './dog-search.component.html',
  styleUrls: ['./dog-search.component.scss']
})
export class DogSearchComponent implements OnInit {

  breeds = []
  selectedBreed = ""
  mostRecentSearchResult: SearchResult | undefined = undefined

  pageSize = 25
  pageLength = 0
  dogList: Dog[] = []

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.dogService.getDogBreeds().subscribe({
      next: data => this.breeds = data
    })
    this.dogSearch()
  }

  pageChange(e: any) {
    if ((e.previousPageIndex - e.pageIndex) > 0) {
      this.dogPageChange("prev")
    } else {
      this.dogPageChange("next")
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  breedSelectionChanged(e: MatSelectChange) {
    console.log(e.value)
  }

  dogSearch() {
    this.dogService.dogSearch().subscribe({
      next: data => {
        this.processSearchQuery(data)
      }
    })
  }

  dogPageChange(prevOrNext: string) {
    let nextQuery = ""
    if (prevOrNext === "next") {
      nextQuery = this.mostRecentSearchResult?.next || ""
    } else {
      nextQuery = this.mostRecentSearchResult?.prev || ""
    }
    if (nextQuery === "") {
      console.error("FAILED TO FETCH PAGE")
      return
    }
    this.dogService.generatedDogSearch(nextQuery).subscribe({
      next: data => {
        this.processSearchQuery(data)
      }
    })
  }

  getDogs(dogIds: string[]) {
    this.dogService.getDogs(dogIds).subscribe({
      next: data => {
        this.dogList = data
      }
    })
  }

  processSearchQuery(result: SearchResult) {
    this.mostRecentSearchResult = result
    this.pageLength = result.total
    this.getDogs(result.resultIds)
  }
}
