import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { TripService } from '../../trip.service';
import { UserService } from '../../user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {


  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  location ='';
  users=[];
  airline ='';
  flightDetail='';
  hotel='';
  userList=[];

  constructor(private router: Router ,private userService: UserService, private tripService:TripService,private route: ActivatedRoute , private ts: EventService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserList();
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'trip' : this.route.snapshot.params['id'],
      'users' :[null],
      'airline': [null],
      'flightDetail': [null],
      'hotel': [null]
    },{validator: this.dateLessThan('startsAt', 'endsAt')});
  }

  getTrip() {
    this.tripService.getOneTrip(this.route.snapshot.params['id']).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.boardsForm.patchValue({
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate()
        });
      }
    });
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

  onFormSubmit(form: NgForm) {
    this.ts.createEvent(form);
    this.router.navigate(['/edit-trip/',this.route.snapshot.params['id']]);
  }


  onAutocompleteSelected(result: PlaceResult) {
    this.boardsForm.patchValue({
      location: result.formatted_address
    })
  }

}
