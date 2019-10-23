import { Component, OnInit, NgZone, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from 'ngx-filter-pipe';
import { TravelItinerary } from '../../travel-itinerary.model';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { UserService } from '../../user.service';
import { User } from 'src/app/user.model';
import { Trip } from '../../trip.model';
import { TripService } from '../../trip.service';

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
    private travelItineraryService: TravelItineraryService,
    private userService: UserService,
    private tripService: TripService
  ) { }

  travelItineraries: TravelItinerary[];
  isBusy: boolean;
  selectedValue: string;
  filterDateMode: string;
  availableOptions: any[];
  dateFilter: Observable<any[]>;
  travelItinerary: TravelItinerary[];
  selectedViewMode='';
  users: User[];
  trip: Trip[];
  filterTravelItinerary: TravelItinerary[];
  listOfMonths =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    this.availableOptions = ['None', 'Staff', 'Month'];
    this.selectedViewMode = 'none';
    this.filterDateMode = 'Current';
    // this.travelItineraries = this.af.list('/TravelItinerary').valueChanges();
    // this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
    //   this.travelItinerary = actionArray.map(e => {
    //     // console.log(e);
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as TravelItinerary;
    //   });
    // });
    this.spinner.show();
    this.getTravelItitnerary().then(() => {
      this.getUser();
      this.getTrip();
      let itineraries= [];
      this.travelItinerary.forEach(function(snapshot) {
        if(snapshot.endsAt.toDate()>=  new Date()){
            itineraries.push(snapshot)
        }
      })

      this.filterTravelItinerary = itineraries.sort(function(a,b){ return b.startsAt.toDate() - a.startsAt.toDate()})
      this.spinner.hide();
    })
  }

  getTravelItitnerary() {
    return new Promise((resolve, reject) => {
      this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
        this.travelItinerary = actionArray.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as TravelItinerary;
        });
        resolve("completed");
      })
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe(actionArray => {
        this.users = actionArray.map(e=>{
          return {
            uid:e.payload.doc.id,
            ...e.payload.doc.data()
          } as User
        })
        resolve("completed");
      })
    });
  }

  getTrip() {
    return new Promise((resolve, reject) => {
      this.tripService.getTrips().subscribe(actionArray => {
        this.trip = actionArray.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Trip;
        });
        return resolve("completed");
      });
    })
  }

  toggleDone(todo: any): void {
    // ...
  }

  updateTravelItinerary(todo: any, newValue: string): void {
    // ...
  }

  checkIfInEmail (list, item): any {
    var result = false;
    if(list){
      this.trip.forEach(function(snapshot){
        if(snapshot.travelItinerary === list.Id){
          if(snapshot.users){
            if(snapshot.users.map( x => x.email).includes(item)){
              result = true
            }
          }
        }
      })
    }
    return result
  }


  sortFunc (a: TravelItinerary, b:TravelItinerary) {
    return a.startsAt.toDate() - b.startsAt.toDate()
  }

  checkIfInMonth (month,item) :any {
    var result = false;
  
    const itemIndex = item.toDate().getMonth()
    if(this.listOfMonths[itemIndex]===month){
      result = true
      
    }
    return result
  }

  onNgModelChange(value) {

  }

  setValue(e){
    let itineraries= [];
    if(e.checked){
        this.filterDateMode = 'Current'
        this.travelItinerary.forEach(function(snapshot) {
          if(snapshot.endsAt.toDate()>= new Date()){
            itineraries.push(snapshot)
          }
        })
      }else{
        this.filterDateMode = 'Past'
        this.travelItinerary.forEach(function(snapshot) {
          if(snapshot.endsAt.toDate()< new Date()){
            itineraries.push(snapshot)
          }
        })
      }
      this.filterTravelItinerary = itineraries.sort(function(a,b){ return b.startsAt.toDate() - a.startsAt.toDate()
      })
}


  filterDate(item): any {
    var result = true;
    if(this.filterDateMode==='Up Coming') {
      if(item.endsAt< new Date()){
        return false
      }
    } else {
      if(item.endsAt> new Date()){
        return false
      }
    }
    return result
  }
  setDateFilter (item) {
    if (item === 'None') {
      this.selectedViewMode='none'
    } else if (item === 'Staff') {
      this.selectedViewMode ='staff'
    } else if (item === 'Month') {
      this.selectedViewMode ='month'
    }
  }

}
