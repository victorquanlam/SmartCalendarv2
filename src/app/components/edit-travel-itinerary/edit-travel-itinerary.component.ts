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
  selectedUser='';
  isEditing=false;
  trips: Trip[];
  userList=[];
  events: Event[];
  travelItinerary= '';
  currentUser=this.authService.userData;
  closeResult: string;
  selectedExpense ='';
  showMap=false;
  showBudget=false;

  //google map direction
  origin:any;
  destination:any;
  waypoints:any[] =[];

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
      'endsAt' : [null, Validators.required],
      'users': []
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

  enableMap() {
    if(this.showMap){
      this.showMap = false
    } else {
      this.showMap = true
    }
  }

  enableBudget () {
    if(this.showBudget){
      this.showBudget = false
    } else {
      this.showBudget = true
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
        this.selectedUser = tmp.users? tmp.users:[];
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate(),
          users:this.selectedUser
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
      for(var i =0; i<this.trips.length;i++) {
        if(i==0) {
          this.origin = {lat:this.trips[i].latitude, lng:this.trips[i].longitude}
        } else if (i== this.trips.length -1) {
          this.destination = {lat:this.trips[i].latitude, lng:this.trips[i].longitude}
        } else {
          this.waypoints.push({location : {lat:this.trips[i].latitude, lng:this.trips[i].longitude}})
          console.log(this.waypoints)
        }
      }
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

  openExpense(content,mode,expenseId){
    this.expenseForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'cost' : [null, Validators.required],
      'staff' : [null, Validators.required],
      'attachmentId' : [null],
      'downloadURL' : [null]
    });
    this.selectedExpense = expenseId
    if(mode==='edit' || mode==='add'){
      if(mode==='edit'){
        // this.expenseForm['attachmentId'].disable();
        // this.expenseForm['downloadURL'].disable();
        this.expenseService.getOneExpense(expenseId).subscribe(data => {
          const tmp: any = data.payload.data();
          if(tmp) {
            this.expenseForm.setValue({
              title: tmp.title,
              cost: tmp.cost,
              staff: tmp.staff,
              attachmentId:tmp.attachmentId||'',
              downloadURL: tmp.downloadURL||''
            });
          }
        })
  
      } 
      
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    } else if ( mode==='link'){
      //open download link
      window.open(expenseId)
    } else if (mode==='delete') {
      this.expenseService.getOneExpense(expenseId).subscribe(data => {
        const tmp: any = data.payload.data();
        if(tmp) {
          console.log(tmp.attachmentId)
          this.afStorage.ref(tmp.attachmentId).delete()
          this.expenseService.deleteExpense(tmp.id)
        }
      })
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


  uploadURL='';
  async uploadToStorage(event,fileId) {
    let randomId;
    if(fileId==='') {
     randomId = Math.random().toString(36).substring(2);
    } else {
      randomId = fileId
      this.ref = this.afStorage.ref(randomId);
      this.ref.delete()
    }
  // create a reference to the storage bucket location
 

  this.ref = this.afStorage.ref(randomId);
  // the put method creates an AngularFireUploadTask
  // and kicks off the upload
  this.task = await this.ref.put(event.target.files[0]).then((snapshot) => {
    console.log(snapshot.downloadURL)
  })
  const downloadURL = await this.ref.getDownloadURL()

      downloadURL.subscribe(url=>{
        if(url){
            this.uploadURL = url;
            this.expenseForm.patchValue({
              attachmentId: randomId,
              downloadURL: url
            })
        }
    })
  }

  cancelUploadingAttachment(){
    this.ref.delete()
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
