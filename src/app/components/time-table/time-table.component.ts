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
import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { EventService } from '../../event.service';
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
    public modal: NgbModal
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
  trip: Trip[];
  eventList: Event[];
  events: CalendarEvent[];
  selectedOptions: any;
  ngOnInit() {
    this.filterDateMode = 'upcoming';
    this.spinner.show();

    // now we are waiting
    this.getTravelItitnerary().then(() => {
      this.getTrip().then(() => {
        this.getEvent().then(() => {
          this.assignEvents();
        });
      });
    });
  }

  //assign events
  assignEvents(travelItinerary = []) {
    // lists to filter trips and events
    let filteredTrips = [];
    let filteredEvents = [];
    let filterItinerary = [];
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
    if (travelItinerary.length > 0) {
      filteredTrips = this.trip.filter((trip) => {
        return travelItinerary.indexOf(trip.travelItinerary) > -1
      });
    } else {
      filteredTrips = this.trip;
    }
    if (travelItinerary.length > 0) {
      for (let i = 0; i < this.eventList.length; i++) {
        for (let j = 0; j < filteredTrips.length; j++) {
          if (this.eventList[i].trip === filteredTrips[j].id) {
            filteredEvents.push(this.eventList[i]);
          }
        }
      }
    } else {
      filteredEvents = this.eventList;
    }

    if(travelItinerary.length > 0){
      travelItinerary.map((snapshot) => {
        filterItinerary = this.travelItinerary.filter(x => x.id === snapshot)
      })
    } else {
      filterItinerary = this.travelItinerary
    }
    
    filterItinerary.map((snapshot) => {
      this.events.push({
        id: snapshot.id,
        title: snapshot.title,
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
        title: snapshot.title,
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
        title: snapshot.title,
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

  onNgModelChange(e) {
    this.assignEvents(e);
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
    alert('yes')
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
