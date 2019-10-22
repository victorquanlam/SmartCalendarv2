import { Component, OnInit, NgZone, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from 'ngx-filter-pipe';
import { TravelItinerary } from '../../travel-itinerary.model';
import { TravelItineraryService } from '../../travel-itinerary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private af: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private filterPipe: FilterPipe,
    private travelItineraryService: TravelItineraryService
  ) { }

  travelItineraries: Observable<any[]>;
  isBusy: boolean;
  selectedValue: string;
  filterDateMode: string;
  availableOptions: any[];
  dateFilter: Observable<any[]>;
  travelItinerary: TravelItinerary[];

  ngOnInit() {
    this.availableOptions = ['None', 'Staff', 'Month'];
    this.selectedValue = 'None';
    this.filterDateMode = 'upcoming';
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    // this.travelItineraries = this.af.list('/TravelItinerary').valueChanges();
    this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
      this.travelItinerary = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TravelItinerary;
      });
    });
    this.dateFilter = this.travelItineraries;
  }

  addTravelItinerary(value: string): void {
    // ...
  }
  deleteTravelItinerary(todo: any): void {
    // ...
  }

  toggleDone(todo: any): void {
    // ...
  }

  updateTravelItinerary(todo: any, newValue: string): void {
    // ...
  }

  setDateFilter (item) {
    if (item === 'None') {
      console.log('none');
    } else if (item === 'Staff') {
      console.log('staff');
    } else if (item === 'Month') {
      console.log('month');
    }
  }

}
