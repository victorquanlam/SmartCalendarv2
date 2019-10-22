import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


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

  constructor(private router: Router , private route: ActivatedRoute , private ts: EventService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'trip' : this.route.snapshot.params['id'],
      'user' :[null],
      'airline': [null],
      'flightDetail': [null],
      'hotel': [null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.ts.createEvent(form);
    this.router.navigate(['/edit-trip/',this.route.snapshot.params['id']]);
  }

}
