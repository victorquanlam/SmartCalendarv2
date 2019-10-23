import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { EventService } from '../../event.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Trip } from 'src/app/trip.model';
import { User } from 'src/app/user.model';
import { Event } from 'src/app/event.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event='';
  boardsForm: FormGroup;
  title = '';
  startsAt = '';
  endsAt = '';
  id = '';
  isEditing=false;
  userList=[];
  selectedUser=[];
  closeResult: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private eventService: EventService, private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.event = this.route.snapshot.params['id'];
    this.getEvent(this.event);
    this.getUserList();
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'startsAt' : [null, Validators.required],
      'endsAt' : [null, Validators.required],
      'location' : [null, Validators.required],
      'users': [null],
      'trip': [null],
      'airline': [null],
      'flightDetail': [null],
      'hotel': [null]
    });
    this.boardsForm.disable()
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


  getEvent(id) {
    this.eventService.getOneEvent(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if (tmp) {
        this.id = tmp.id;
        this.title = tmp.title;
        this.selectedUser = tmp.users;
        this.boardsForm.setValue({
          title: tmp.title,
          startsAt: tmp.startsAt.toDate(),
          endsAt: tmp.endsAt.toDate(),
          location: tmp.location,
          users: this.selectedUser,
          trip: tmp.trip,
          airline: tmp.airline,
          flightDetail: tmp.flightDetail,
          hotel: tmp.hotel
        });
        
      }
    });
  }


  onAutocompleteSelected(result: PlaceResult) {
    this.boardsForm.patchValue({
      location: result.formatted_address
    })
  }

  onLocationSelected(result) {
    console.log(result)
  }

  enableEdit() {
    this.isEditing=true;
    this.boardsForm.enable()
  }

  delete() {
    this.eventService.deleteEvent(this.route.snapshot.params['id']);
    this.router.navigate(['/dashboard/']);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  onFormSubmit(form: NgForm) {
    this.isEditing=false;
    const trip ={...form};
    console.log(trip)
    this.eventService.updateEvent(this.route.snapshot.params['id'],trip)
    this.boardsForm.disable();
  }

}
