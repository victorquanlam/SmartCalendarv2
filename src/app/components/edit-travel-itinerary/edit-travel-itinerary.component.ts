import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { EventService } from '../../event.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { Trip } from 'src/app/trip.model';
import { Event } from 'src/app/event.model';
import { TravelItinerary } from 'src/app/travel-itinerary.model';
import { AuthService } from '../../shared/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Pipe({ name: 'TripFilter' })

@Component({
  selector: 'app-edit-travel-itinerary',
  templateUrl: './edit-travel-itinerary.component.html',
  styleUrls: ['./edit-travel-itinerary.component.css'],
  
})


export class EditTravelItineraryComponent implements OnInit {
  public lat = 24.799448;
  public lng = 120.979021;


  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  trips: Trip[];
  events: Event[];
  travelItinerary= '';
  currentUser=this.authService.userData;
  closeResult: string;

  listOfLocations=[];

  public origin: any;
public destination: any;

  constructor(private router: Router, private route: ActivatedRoute,
  private ts: TravelItineraryService, private formBuilder: FormBuilder,
  private tripService: TripService, public authService: AuthService,
  private modalService: NgbModal,
  private eventService: EventService) { }

  ngOnInit() {
    this.travelItinerary = this.route.snapshot.params['id']
    this.getTravelItinerary(this.travelItinerary);
    this.getTrips(this.travelItinerary).then(() => {
      this.getEvents();
      // this.setValueForLocationList();
    });
    
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    });
    
  }

  getTravelItinerary(id) {
    this.ts.getOneTravelItinerary(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.id = tmp.id;
        this.title = tmp.title;
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
         endsAt: tmp.endsAt.toDate()
        });
      }
    });
  }

  getTrips(id) {
    return new Promise((resolve, reject) => {
    this.tripService.getTrips().subscribe(actionArray => {
      this.trips = actionArray.map(e=>{
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Trip
      });
      resolve("completed");
    })
  }); 
  }

  getEvents() {
    return new Promise((resolve, reject) => {
    this.eventService.getEvents().subscribe(actionArray => {
      this.events = actionArray.map(e=>{
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event
      });
      resolve("completed");
    })
  }); 
  }

  delete() {
    try{
      // this.trips.forEach(function(snapshot){
      //   if(snapshot.travelItinerary===this.route.snapshot.params['id']){
      //     this.events.forEach(function(childSnapshot){
      //       if(childSnapshot.trip === snapshot.id){
      //         this.eventService.delete(childSnapshot.trip)
      //       }
      //     })
      //     this.tripService.delete(snapshot.id)
      //   }
      // })
      this.ts.deleteTravelItinerary(this.route.snapshot.params['id']);
    } finally{
      this.router.navigate(['/dashboard/']);
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  enableEdit() {
    this.isEditing=true;
    this.boardsForm.enable()
  }

  onFormSubmit(form: NgForm) {
    this.isEditing=false;
    
    const travelItinerary = {
      ...form
    }
    this.ts.updateTravelItinerary(this.route.snapshot.params['id'], travelItinerary);
    this.boardsForm.disable();
  }


  setValueForLocationList () {
    this.trips.forEach(function(snapshot){
      this.openMap(snapshot.location)
    })
  }


   openMap (event):void {
    var geocoder = new google.maps.Geocoder();
    var address = event;
    var latitude;
    var longitude;
    console.log(event)
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
      }
      if(this.listOfLocations.length===0){
        this.lat =latitude;
        this.long = longitude;
      }
      console.log(this.listOfLocations)
      this.listOfLocations.push({lat:latitude,long:longitude})
      console.log(this.listOfLocations)
    }); 
  };

}
