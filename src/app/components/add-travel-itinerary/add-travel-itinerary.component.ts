import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-travel-itinerary',
  templateUrl: './add-travel-itinerary.component.html',
  styleUrls: ['./add-travel-itinerary.component.css']
})
export class AddTravelItineraryComponent implements OnInit {

  constructor(private router: Router, private ts: TravelItineraryService, private formBuilder: FormBuilder) { }

  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    }, {validator: this.dateLessThan('startsAt', 'endsAt')});
  }

  private dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];

     let today = new Date();

     if(f.value < today || t.value < today) {
      return {
        dates: "Date should not be less than today"
      };
     }

     if (f.value > t.value) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  onFormSubmit(form: NgForm) {
    this.ts.createTravelItinerary(form);
    this.router.navigate(['/dashboard']);
  }

}
