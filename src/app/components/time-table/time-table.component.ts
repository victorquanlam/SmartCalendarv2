import { Component, OnInit, NgZone, Pipe, PipeTransform, ChangeDetectionStrategy,
ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
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
  addHours
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

  async ngOnInit() {
    this.filterDateMode = 'upcoming';
    this.spinner.show();
    

    this.getTravelItitnerary();
    this.getTrip();
    this.getEvent();


    ///need to wait for other functions to complete but not really
    this.assignEvents();
  }

  //assign events

  assignEvents() {
    this.trip.forEach(function(snapshot){
      //trips are in blue 
      this.events.push({
        id: snapshot.id,
        title: snapshot.title,
        start: new Date(snapshot.startsAt),
        end: new Date(snapshot.endsAt),
        color: colors.blue
      })

    })

    //events are in yellow

    this.eventList.forEach(function(snapshot) {
      this.events.push({
        id:snapshot.id,
        title: snapshot.title,
        start: new Date(snapshot.startsAt),
        end: new Date(snapshot.endsAt),
        color: colors.yellow
      })
    })
  }

  //get Data

  async getTravelItitnerary(){
    await this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
      this.travelItinerary = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TravelItinerary;
      });
    });
  }

  async getTrip(){
      await this.tripService.getTrips().subscribe(actionArray => {
        this.trip = actionArray.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Trip;
        });
        
      });
  }

  async getEvent() {
    await this.eventService.getEvents().subscribe(actionArray => {
      this.eventList = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
    });
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();


  //example events
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
