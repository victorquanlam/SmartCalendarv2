import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-travel-itinerary',
  templateUrl: './add-travel-itinerary.component.html',
  styleUrls: ['./add-travel-itinerary.component.css']
})
export class AddTravelItineraryComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private ts: TravelItineraryService, private formBuilder: FormBuilder) { }

  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  users=[];
  userList=[];

  ngOnInit() {
    this.getUserList();
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'users' :[null]
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

  onFormSubmit(form: NgForm) {
    this.ts.createTravelItinerary(form);
    this.router.navigate(['/dashboard']);
  }

}
