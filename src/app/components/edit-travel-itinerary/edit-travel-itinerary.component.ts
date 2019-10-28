import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import { TravelItineraryService } from '../../travel-itinerary.service';
import { TripService } from '../../trip.service';
import { EventService } from '../../event.service';
import { UserService } from '../../user.service';

import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { Trip } from 'src/app/trip.model';
import { Event } from 'src/app/event.model';
import { Expense } from 'src/app/expense.model';
import { ExpenseService } from 'src/app/expense.service';
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
  expenseForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  trips: Trip[];
  userList=[];
  events: Event[];
  travelItinerary= '';
  currentUser=this.authService.userData;
  closeResult: string;
  selectedExpense ='';

  //firebase storage
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  //download link for storage upload
  downloadURL: string;

  listOfLocations=[];

  item: string;
  cost: number;
  displayedColumns = ['item', 'cost','staff','actions'];
  expense: Expense[];

  public origin: any;
  public destination: any;

  constructor(private router: Router, private route: ActivatedRoute,
  private ts: TravelItineraryService, private formBuilder: FormBuilder,
  private tripService: TripService, public authService: AuthService,
  private modalService: NgbModal,
  private eventService: EventService,
  private expenseService: ExpenseService,
  private userService: UserService,
  private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.travelItinerary = this.route.snapshot.params['id']
    this.getTravelItinerary(this.travelItinerary);
    this.getExpenses(this.travelItinerary);
    this.getTrips(this.travelItinerary).then(() => {
      this.getEvents();
      // this.setValueForLocationList();
    });

    this.getUserList();
    
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required]
    },{validator: this.dateLessThan('startsAt', 'endsAt')});
    
    this.boardsForm.disable()

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

  getTotalCost() {
    let totalCost = 0;
    if(this.expense && this.expense.length>0){
      totalCost = this.expense.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }
    return totalCost;
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

  getExpenses(id) {
    this.expenseService.getExpense(id).subscribe(actionArray => {
      this.expense = actionArray.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Expense
      })
    })
  }

  getTrips(id:string) {
    return new Promise((resolve, reject) => {
    this.tripService.getTripsBaseOnItinerary(id).subscribe(actionArray => {
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
      this.ts.deleteTravelItinerary(this.route.snapshot.params['id']);
    } finally{
      this.router.navigate(['/dashboard/']);
    }
  }

  deleteExpense(id) {
    this.expenseService.deleteExpense(id)
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openExpense(content2,mode,expenseId){
    this.expenseForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'cost' : [null, Validators.required],
      'staff' : [null, Validators.required]
    });
    if(mode==='edit' || mode==='add'){
      this.expenseService.getOneExpense(expenseId).subscribe(data => {
        const tmp: any = data.payload.data();
        if(tmp) {
          this.expenseForm.setValue({
            title: tmp.title,
            cost: tmp.cost,
           staff: tmp.staff
          });
        }
      })

      this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    } else if (mode==='delete' || mode==='link'){
      this.selectedExpense = expenseId
    }
    
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

  enableEdit() {
    this.isEditing=true;
    this.boardsForm.enable()
  }

  addExpense (form: NgForm) {
    const expense = {
      ...form,
      travelItinerary: this.route.snapshot.params['id']
    }
    this.expenseService.createExpense(expense)
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


  async uploadToStorage(event) {
    const id =this.selectedExpense;
    this.ref = this.afStorage.ref(id);
    this.task = await this.ref.put(event.target.files[0]).then((snapshot) => {
      console.log(snapshot.downloadURL)
      this.downloadURL = snapshot.downloadURL
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
