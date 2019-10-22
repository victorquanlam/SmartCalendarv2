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
    private excelService:ExcelService
  ) { }

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
    });
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

  // exportAsXLSX():void {
  //   this.excelService.exportAsExcelFile(this.data, 'sample');
  // }


  // exportToCSV = function (startInput:string,endInput:string,reportTitle:string) {
  //   var error= false;
  //   let CSV = '';
  //   this.travelItinerary.forEach(function(travelItinerary){
  //     //show the travelItinerary
  //     if(startInput && endInput && reportTitle){
  //       if(!(travelItinerary.endsAt< new Date(startInput) || travelItinerary.startsAt> new Date(endInput))){
      
  //     CSV += moment(travelItinerary.startsAt).format("dd MMMM Do YYYY")+' - '+ moment(travelItinerary.endsAt).format("dd MMMM Do YYYY") + '\r\n'
  //     CSV += 'Country,Start,End,Title,Location,User' + '\r\n'
  //       this.trip.forEach(function(trip){
  //         if(trip.travelItinerary === travelItinerary.Id){
  //           CSV += trip.location.replace(/,/g, '-') +',';


  //           this.event.forEach(function(event) {
              
              
  //             if(event.trip === trip.Id) {
  //               var row= moment(event.startsAt).format("dd MMMM Do YYYY") + ','+moment(event.endsAt).format("dd MMMM Do YYYY") + ',' + event.title +','+event.location.replace(/,/g, '-')+',';
  //               CSV += row
  //               if(event.users && event.users !== 'N/A' && event.users.length >0){
  //                 CSV += event.users[0].fullName + '\r\n'
  //                 for(var i =1; i<event.users.length;i++){
  //                   CSV += ',,,,,' +event.users[i].fullName +'\r\n'
                    
  //                 }
  //               }
                
  //             }
  //           })

  //         }
            
  //         })
  //         CSV +='\r\n'
  //       }
        
  //     } else {
  //       error= true
  //     }
  //   })
    
  //   if(error) {
  //     alert('Cannot generate CSV file due to invalid input')
  //   } else {
  //   }
  // }

}
