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

@Pipe({ name: 'TripFilter' })

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})


export class EditTripComponent implements OnInit {

  trip='';
  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  userList=[];
  eventList: Event[];

  constructor(private router: Router, private route: ActivatedRoute,
    private ts: TripService, private formBuilder: FormBuilder,
    private userService: UserService, private eventService: EventService) { }

  ngOnInit() {
    this.trip = this.route.snapshot.params['id'];
    this.getTrip(this.trip);
    this.getUserList();
    this.getEvents();
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'users': [null]
    });
    this.boardsForm.disable()


    console.log(this.trip)
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

  getEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.eventList = data.map( e=> {
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Event
      })
      console.log(this.eventList)
    })
    
  }

  getTrip(id) {
    this.ts.getOneTrip(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.id = tmp.id;
        this.title = tmp.title;
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate(),
          location: tmp.location,
          users: tmp.users? tmp.users:[]
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
