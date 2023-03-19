import { Component, OnInit, ViewChild } from '@angular/core';
import { DogService } from '../services/dog.service';
import { Dog } from '../models/Dog';
import { SearchResult } from '../models/SearchResult';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dog-search',
  templateUrl: './dog-search.component.html',
  styleUrls: ['./dog-search.component.scss']
})
export class DogSearchComponent implements OnInit {

  breeds = []
  selectedBreed: any = undefined

  sortByOptions = [
    {field: "Breed", dir: "asc"},
    {field: "Breed", dir: "desc"},
    {field: "Name", dir: "asc"},
    {field: "Name", dir: "desc"},
  ]
  selectedSortBy = this.sortByOptions[0]

  mostRecentSearchResult: SearchResult | undefined = undefined

  @ViewChild('paginator') 
  paginator!: MatPaginator;
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

  /**
   * Preform an iniatal dog search. This should be done initially when the
   * page loads, OR when a user changes a filter/search parameter
   */
  dogSearch() {
    this.dogService.dogSearch(this.selectedBreed, this.selectedSortBy, this.pageSize).subscribe({
      next: data => {
        this.processSearchQuery(data)
      }
    })
  }

  /**
   * Using the pregenerated queries for next and prev pages
   * preform a search for the next or prev page
   * @param prevOrNext string of value "next" or "prev"
   */
  dogPageChange(prevOrNext: string) {
    let nextQuery = ""
    if (prevOrNext === "next") {
      nextQuery = this.mostRecentSearchResult?.next || ""
    } else if (prevOrNext === "prev") {
      nextQuery = this.mostRecentSearchResult?.prev || ""
    }
    // Fail out if the query doesn't exist
    if (!nextQuery || nextQuery === "") {
      console.error("FAILED TO FETCH PAGE")
      return
    }
    this.dogService.generatedDogSearch(nextQuery).subscribe({
      next: data => {
        this.processSearchQuery(data)
      }
    })
  }

  /**
   * Get a list of dogs, and update the UI with the response
   * @param dogIds List of dog id's to fetch
   */
  getDogs(dogIds: string[]) {
    this.dogService.getDogs(dogIds).subscribe({
      next: data => {
        this.dogList = data
      }
    })
  }

  /**
   * Update all the global fields necessary after a search 
   * @param result 
   */
  processSearchQuery(result: SearchResult) {
    this.mostRecentSearchResult = result
    this.pageLength = result.total
    this.getDogs(result.resultIds)
  }

  /**
   * Handle page change event from paginator component
   * @param e page change event
   */
  pageChange(e: any) {
    if ((e.previousPageIndex - e.pageIndex) > 0) {
      this.dogPageChange("prev")
    } else {
      this.dogPageChange("next")
    }
    // Scroll to the top of the page
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  /**
   * Handle all filter changes like breed and sort
   */
  onSelectionChanged() {
    this.dogSearch()
    this.paginator.pageIndex = 0
  }
}
