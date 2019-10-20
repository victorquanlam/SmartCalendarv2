import { Component, OnInit } from '@angular/core';
import { TripService } from '../../trip.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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
  location ='';

  constructor(private router: Router , private route: ActivatedRoute , private ts: TripService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'travelItinerary' : this.route.snapshot.params['id']
    });
  }

  onFormSubmit(form: NgForm) {
    this.ts.createTrip(form);
    this.router.navigate(['/edit-travel-itinerary/',this.route.snapshot.params['id']]);
  }

}
