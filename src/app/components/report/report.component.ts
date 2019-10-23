import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from 'ngx-filter-pipe';
import { TravelItinerary } from '../../travel-itinerary.model';
import { Event } from '../../event.model';
import { Trip } from '../../trip.model';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { EventService } from '../../event.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ExcelService} from '../../excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    private af: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private filterPipe: FilterPipe,
    private travelItineraryService: TravelItineraryService,
    private eventService: EventService,
    private tripService: TripService,
    private formBuilder: FormBuilder,
    private excelService:ExcelService,
    private datePipe: DatePipe
  ) { }

  datePipeEn: DatePipe = new DatePipe('en-AU');
  travelItineraries: Observable<any[]>;
  isBusy: boolean;
  selectedValue: string;
  filterDateMode: string;
  availableOptions: any[];
  dateFilter: Observable<any[]>;
  travelItinerary: TravelItinerary[];
  event: Event[];
  trip: Trip[];
  boardsForm: FormGroup;
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000,
    test:'test'
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: [{test:'test',test1:'121'}]
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  ngOnInit() {
    
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    }, {validator: this.dateLessThan('startsAt', 'endsAt')});
    this.travelItineraryService.getTravelItinerary().subscribe(actionArray => {
      this.travelItinerary = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as TravelItinerary;
      });
    });


  

    this.eventService.getEvents().subscribe(actionArray => {
      this.event = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event;
      });
    });

    this.tripService.getTrips().subscribe(actionArray => {
      this.trip = actionArray.map(e => {
        // console.log(e);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Trip;
      });
    });
  }


  private dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if (f.value > t.value) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  onFormSubmit(form: NgForm){
    let data ='';
    let trip :Trip[]= this.trip;
    let event : Event[]=this.event;
    this.travelItinerary.forEach(function(snapshot){
      if(snapshot.startsAt.toDate()<=new Date(form['endsAt']) ||snapshot.endsAt.toDate()>=new Date(form['startsAt'])){

        data += snapshot.startsAt.toDate()+' - '+ snapshot.endsAt.toDate()+ '\r\n\n'
        
        data += 'Trip, Event Location,Start,End,Title,Airline,Flight Detail, Hotel,User' + '\r\n'
        if(trip.length>0){
          trip.forEach(function(childSnapshot){
            if(childSnapshot.travelItinerary === snapshot.id){

              if(childSnapshot.location){
                data += childSnapshot.location.replace(/,/g, ' ') +',';
              } else {
                data +=','
              }
              




              if(event.length>0){
                event.forEach(function(childChildSnapshot){
                  if(childChildSnapshot.trip === childSnapshot.id) {
    

                    let row = (childChildSnapshot.location? childChildSnapshot.location.replace(/,/g, '-'):' ' )+','+childChildSnapshot.startsAt.toDate() + ','+childChildSnapshot.endsAt.toDate()+ ',' + childChildSnapshot.title +','+(childChildSnapshot.airline?childChildSnapshot.airline:'')+','+(childChildSnapshot.flightDetail?childChildSnapshot.flightDetail:'')+','+(childChildSnapshot.hotel?childChildSnapshot.hotel:'')+',';
                   
                   console.log(row)
                    data += row

                    if(childChildSnapshot.users  && childChildSnapshot.users.length >0){
                      data += childChildSnapshot.users[0].email + '\r\n'
                      for(var i =1; i<childChildSnapshot.users.length;i++){
                        data += ',,,,,,,,' +childChildSnapshot.users[i].email +'\r\n'
                        
                      }
                    }
                  }
                })
              } else {
                data +='\r\n'
              }
              
            }
          })
        } else {
          data +='\r\n'
        }
        data +='\r\n\n'
      }
      
    })

      this.exportAsXLSX(data,form['title'])
    
  }


  exportAsXLSX(data,title) {
    
    if (data == '') {        
      alert("Invalid data");
      return;
  }  

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += title.replace(/ /g,"_");   
    var uri = 'data:text/csv;charset=utf-8,' + escape(data);
    var link = document.createElement("a");    
    link.href = uri;
    

    link.download = fileName + ".csv";
    link.setAttribute("download", title+".csv");
    document.body.appendChild(link); // Required for FF

    link.click();

    document.body.removeChild(link);
  }

}
