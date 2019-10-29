import {
  Component, OnInit, NgZone, Pipe, PipeTransform, ChangeDetectionStrategy,
  ViewChild, TemplateRef
} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, generate } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from 'ngx-filter-pipe';
import { TravelItinerary } from '../../travel-itinerary.model';
import { Trip } from '../../trip.model';
import { Event } from '../../event.model';
import { User } from '../../user.model';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { EventService } from '../../event.service';
import { UserService } from '../../user.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

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
    private travelItineraryService: TravelItineraryService,
    private tripService: TripService,
    private eventService: EventService,
    public modal: NgbModal,
    private userService: UserService
  ) {
    this.events = [];
  }

  travelItineraries: Observable<any[]>;
  isBusy: boolean;
  selectedValue: string;
  filterDateMode: string;
  availableOptions: any[];
  dateFilter: Observable<any[]>;
  travelItinerary: TravelItinerary[];
  trip: Trip[] = [];
  eventList: Event[] = [];
  events: CalendarEvent[];
  users: User[];
  selectedOptions: TravelItinerary[];
  selectedUserOptions: User[];
  ngOnInit() {
    this.filterDateMode = 'upcoming';
    this.spinner.show();

    // now we are waiting
    this.getTravelItitnerary().then(() => {
      this.getUser();
      this.getTrip().then(() => {
        this.getEvent().then(() => {
          this.assignEvents([],'');
          this.spinner.hide();
        });
      });
    });
  }

  clearItineraryFilter():void{
    this.selectedOptions = undefined;
  }

  clearStaffFilter() : void {
    this.selectedUserOptions = undefined;
  }

  clearFilter():void {
    this.selectedUserOptions = undefined;
    this.selectedOptions = undefined;
  }
  
  //assign events
  assignEvents(travelItinerary: TravelItinerary[], type: string) {
    if(type==='user'){
      if(travelItinerary.length ===0){
        this.events = [];
        return
      }
    }
    // lists to filter trips and events
    let filteredTrips: Trip[] =[];
    let filteredEvents: Event[] =[];
    let filterItinerary:TravelItinerary[] =[];

    let allTrips = this.trip;
    let allEvents = this.eventList;
    this.events = [];
    // Calender Initialization
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];
    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
    // Dates format
    const sDate = format(getStart(this.viewDate), 'YYYY-MM-DD');
    const eDate = format(getEnd(this.viewDate), 'YYYY-MM-DD');
    if(travelItinerary.length > 0){
      filterItinerary = travelItinerary
      filterItinerary.forEach(function(snapshot) {

        const trips= allTrips.filter(x => x.travelItinerary === snapshot.id)
        trips.forEach(function(childSnapshot){
          
          if(filteredTrips.indexOf(childSnapshot) === -1) {
            filteredTrips.push(childSnapshot)
          }
        })
      })

      filteredTrips.forEach(function(snapshot) {
        const events = allEvents.filter( x => x.trip === snapshot.id)
        events.forEach(function(childSnapshot) {
          if(filteredEvents.indexOf(childSnapshot) === -1) {
            filteredEvents.push(childSnapshot)
          }
        })
      })
    }  else {
        filteredTrips = this.trip;
        filteredEvents = this.eventList;
        filterItinerary = this.travelItinerary;
    }

    
    
    filterItinerary.map((snapshot) => {
      this.events.push({
        id: snapshot.id,
        title: 'Itinerary ' +snapshot.title,
        start: new Date(snapshot.startsAt.seconds * 1000),
        end: new Date(snapshot.endsAt.seconds * 1000),
        color: colors.red,
        allDay: true
      })
    })

    //trips are in yellow
    filteredTrips.map((snapshot) => {
      this.events.push({
        id: snapshot.id,
        title: 'Trip ' + snapshot.title,
        start: new Date(snapshot.startsAt.seconds * 1000),
        end: new Date(snapshot.endsAt.seconds * 1000),
        color: colors.blue,
        allDay: true
      })
    })
    //events are in yellow
    filteredEvents.map((snapshot) => {
      this.events.push({
        id: snapshot.id,
        title: 'Event '+ snapshot.title,
        start: new Date(snapshot.startsAt.seconds * 1000),
        end: new Date(snapshot.endsAt.seconds * 1000),
        color: colors.yellow
      })
    })
    // Generating view
    this.events.map((e) => {
      return this.generateEventView(e);
    })
  }

  onTravelNgModelChange(e) {
    this.assignEvents(e,'');
  }

  onNgUserModelChange(e) {
    let allTravelItinerary = this.travelItinerary
    let travelItineraries: TravelItinerary[]=[];
    
    if(e.length ===0){
      this.assignEvents(travelItineraries,'');
      return
    }

    e.forEach(function(snapshot){
      const travelItinerary = allTravelItinerary.filter( function (itinerary) {
        if(itinerary.users.filter( x=> x.email === snapshot.email).length>0){
          return true
        }
      })
      travelItinerary.forEach(function(childSnapshot){
        if(travelItineraries.indexOf(childSnapshot) === -1) {
          travelItineraries.push(childSnapshot)
        }
      })
    })

    console.log(travelItineraries)
    this.assignEvents(travelItineraries,'user')
  }

  myTripFilterByEmail(itineraries: TravelItinerary[], email:string):TravelItinerary[] {
    const result = itineraries.filter( function (itinerary) {
      if(itinerary.users.filter( x=> x.email === email).length>0){
        return true
      }
    })
    return result
  }

  generateEventView(e): any {
    return {
      title: e.title,
      color: e.color,
      start: e.start,
      end: e.end,
    };
  }

  //get Data

  getUser() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe(actionArray => {
        this.users = actionArray.map(e => {
          return {
            uid: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
        resolve("completed");
      })
    });
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

  getEvent() {
    return new Promise((resolve, reject) => {
      this.eventService.getEvents().subscribe(actionArray => {
        
        this.eventList = actionArray.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Event;
        });
        return resolve("completed");
      });
    })
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = true;

  // constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if(event.title.includes('Itinerary')){
      this.router.navigate(['/edit-travel-itinerary/' + event.id]);
    } else if(event.title.includes('Trip')){
      this.router.navigate(['/edit-trip/' + event.id]);
    } else {
      this.router.navigate(['/edit-event/' + event.id]);
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
