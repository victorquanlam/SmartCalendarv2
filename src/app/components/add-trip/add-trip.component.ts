import { Component, OnInit } from '@angular/core';
import { TripService } from '../../trip.service';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  userList=[];
  location ='';

  constructor(private router: Router ,private userService: UserService, private route: ActivatedRoute , private travelItineraryService: TravelItineraryService, private ts: TripService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserList()
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'travelItinerary' : this.route.snapshot.params['id'],
      'users' :[null]
    }, {validator: this.dateLessThan('startsAt', 'endsAt')});
    this.getTravelItinerary()
  }

  getTravelItinerary() {
    this.travelItineraryService.getOneTravelItinerary(this.route.snapshot.params['id']).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.boardsForm.patchValue({
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate(),
          user: tmp.user
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

  onAutocompleteSelected(result: PlaceResult) {
    this.boardsForm.patchValue({
      location: result
    })
  }

  onFormSubmit(form: NgForm) {
    this.ts.createTrip(form);
    this.router.navigate(['/edit-travel-itinerary/',this.route.snapshot.params['id']]);
  }

}
