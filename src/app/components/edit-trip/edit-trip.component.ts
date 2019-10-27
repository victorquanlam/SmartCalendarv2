import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from '../../trip.service';
import { UserService } from '../../user.service';
import { EventService } from '../../event.service';

import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Trip } from 'src/app/trip.model';
import { User } from 'src/app/user.model';
import { Event } from 'src/app/event.model';
import PlaceResult = google.maps.places.PlaceResult;

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Pipe({ name: 'TripFilter' })

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})


export class EditTripComponent implements OnInit {

  trip='';
  travelItinerary='';
  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  userList=[];
  eventList: Event[];
  selectedUser=[];
  closeResult: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private ts: TripService, private formBuilder: FormBuilder,
    private userService: UserService, private eventService: EventService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.trip = this.route.snapshot.params['id'];
    this.getTrip(this.trip);
    this.getUserList();
    this.getEvents(this.trip);
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'users': []
    },{validator: this.dateLessThan('startsAt', 'endsAt')});
    
    this.boardsForm.disable()

  }

  getUserList() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data.map(e=>{
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      
    })
  }

  getEvents(trip:string) {
    this.eventService.getEventsBaseOnTrip(trip).subscribe(data => {
      this.eventList = data.map( e=> {
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event
      })
    })
    
  }


  onAutocompleteSelected (result: PlaceResult) {
    console.log(result)
    this.boardsForm.patchValue({
      location: result.formatted_address
    })
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

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    // this.latitude = location.latitude;
    // this.longitude = location.longitude;
  }


  delete() {
    this.ts.deleteTrip(this.route.snapshot.params['id']);
    this.router.navigate(['/dashboard/']);
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

  compareWithFunc(a, b) {
    return a.email === b.email;
  }

  getTrip(id) {
    this.ts.getOneTrip(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.travelItinerary = tmp.travelItinerary;
        this.id = tmp.id;
        this.title = tmp.title;
        this.selectedUser = tmp.users? tmp.users:[];
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate(),
          location: tmp.location,
          users:this.selectedUser
        });
      }
    });
  }

  enableEdit() {
    this.isEditing=true;
    this.boardsForm.enable()
  }

  onFormSubmit(form: NgForm) {
    this.isEditing=false;
    const trip ={...form};
    this.ts.updateTrip(this.route.snapshot.params['id'],trip)
    this.boardsForm.disable();
  }

}
