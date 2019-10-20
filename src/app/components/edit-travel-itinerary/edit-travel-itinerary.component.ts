import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { Trip } from 'src/app/trip.model';
import { TravelItinerary } from 'src/app/travel-itinerary.model';
import { AuthService } from '../../shared/services/auth.service';


@Pipe({ name: 'TripFilter' })

@Component({
  selector: 'app-edit-travel-itinerary',
  templateUrl: './edit-travel-itinerary.component.html',
  styleUrls: ['./edit-travel-itinerary.component.css']
})
export class EditTravelItineraryComponent implements OnInit {

  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  trips: Trip[];
  travelItinerary= '';
  currentUser=this.authService.userData;

  constructor(private router: Router, private route: ActivatedRoute,
  private ts: TravelItineraryService, private formBuilder: FormBuilder,
  private tripService: TripService, public authService: AuthService) { }

  ngOnInit() {
    this.travelItinerary = this.route.snapshot.params['id']
    this.getTravelItinerary(this.travelItinerary);
    this.getTrips(this.travelItinerary );
    
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    });
    this.boardsForm.disable()
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
    this.tripService.getTrips().subscribe(actionArray => {
      this.trips = actionArray.map(e=>{
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Trip
      })
    })
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

}
