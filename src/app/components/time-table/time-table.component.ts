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
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

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
    this.filterDateMode = 'upcoming';
    this.spinner.show();
    this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
      this.travelItinerary = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TravelItinerary;
      });
    });
  }

}
