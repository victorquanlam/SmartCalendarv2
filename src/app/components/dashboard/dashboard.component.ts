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
import { isThisSecond } from 'date-fns';

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

  isBusy: boolean;
  selectedValue: string;
  filterDateMode: string;
  availableOptions: any[];
  dateFilter: Observable<any[]>;
  travelItinerary: TravelItinerary[];
  selectedViewMode='';
  users: User[];
  myData : User;
  trip: Trip[];
  myTravelItinerary: TravelItinerary[];
  allTravelItinerary: TravelItinerary[];
  selectedTravelItitnerary: TravelItinerary[];
  listOfMonths =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    this.myData = this.authService.userData;
    this.availableOptions = ['My Itinerary','All Itinerary', 'Staff', 'Month'];
    this.selectedViewMode = 'myTrip';
    this.selectedValue='My Itinerary'
    this.filterDateMode = 'Current';


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
      this.allTravelItinerary = itineraries.sort(function(a,b){ return b.startsAt.toDate() - a.startsAt.toDate()})
      
      // filter Travel Ititnerary to my trip only by default
      if(this.authService.userData){
        this.myTravelItinerary = this.myTripFilterByEmail(this.travelItinerary,this.authService.userData.email)
      }
      this.setValue('default')
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
        this.users = this.users.sort(function(a, b){
          if(!a.displayName) { return 1; }
          if(!b.displayName) { return -1; }
          if(a.displayName < b.displayName) { return -1; }
          if(a.displayName > b.displayName) { return 1; }
          return 0;
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
    let itineraries:TravelItinerary []= [];
    let selectedTravelItitnerary:TravelItinerary []= [];
     if (this.selectedViewMode==='myTrip') {
      selectedTravelItitnerary = this.myTravelItinerary
    } else {
      selectedTravelItitnerary = this.travelItinerary
    }
    if(e==='default' || e.checked){
        this.filterDateMode = 'Current'
        selectedTravelItitnerary.forEach(function(snapshot) {
          if(snapshot.endsAt.toDate()>= new Date()){
            itineraries.push(snapshot)
          }
        })
      }else{
        this.filterDateMode = 'Past'
        selectedTravelItitnerary.forEach(function(snapshot) {
          if(snapshot.endsAt.toDate()< new Date()){
            
            itineraries.push(snapshot)
          }
        })
      }
      //sort by date
      selectedTravelItitnerary = itineraries.sort(function(a,b){ return b.startsAt.toDate() - a.startsAt.toDate()
      })
      this.selectedTravelItitnerary =selectedTravelItitnerary

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

  myTripFilterByEmail(itineraries: TravelItinerary[], email:string):TravelItinerary[] {
    const result = itineraries.filter( function (itinerary) {
      if(itinerary.users){
        if(itinerary.users.filter( x=> x.email === email).length>0){
          return true
        }
      }
    })
    return result
  }

  setDateFilter (item) {
    
    if (item === 'All Itinerary') {
      this.selectedViewMode='none'
    } else if (item === 'Staff') {
      this.selectedViewMode ='staff'
    } else if (item === 'Month') {
      this.selectedViewMode ='month'
    } else if (item === 'My Itinerary') {
      this.selectedViewMode ='myTrip'
    }
    this.filterDateMode = 'Current'
    this.setValue('default')
  }

}
