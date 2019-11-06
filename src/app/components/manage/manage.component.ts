import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelItineraryService } from '../../travel-itinerary.service';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { User } from 'src/app/user.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  users: User[];
  boardsForm: FormGroup;
  roleList =['Admin','Manager','User'];
  uid='';
  userEmail='';
  userPassword='';
  isEditing=false;

  constructor(private userService: UserService,
    private router: Router, private route: ActivatedRoute,
    private ts: TravelItineraryService, private formBuilder: FormBuilder,
    public authService: AuthService) { }

  // Runs on webpage load
  // 1.Sets input fields to empty
  ngOnInit() {
    this.getUser();
    this.boardsForm = this.formBuilder.group({
      'displayName' : [null, Validators.required],
      'email' : [null],
      'firstName' : [null],
      'lastName' : [null],
      'role' : [null, Validators.required],
      'uid' : [null, Validators.required],
    });
    this.boardsForm.controls['uid'].disable()
  }

  getUser() {
    this.userService.getUsers().subscribe(actionArray => {
      this.users = actionArray.map(e=>{
        return {
          uid:e.payload.doc.id,
          ...e.payload.doc.data()
        } as User
      })
    })
  }

  // Runs when the update button is selected
  // 1.Updates the details of the currently selected user
  updateUser(){
    console.log(this.boardsForm.value)
    this.userService.updateUser(this.uid,this.boardsForm.value)
  }

  // Runs when the reset button is clicked
  // 1.Sends a password reset email to the currently selected user.
  sendPasswordReset () {
    console.log(this.boardsForm)
    this.authService.ForgotPassword(this.boardsForm['email']);

  }

  // Runs when the add button is clicked
  // If a user is currently selected:
  // 1.Clears the input fields (Deselecting the currently selected user)
  // 2.Sets the add button's text to "Add Employee"
  // If no user is selected
  // 1.Takes the data from the inputs and creates a new user
  addUser() {
    if((<HTMLInputElement>document.getElementById("addBtn")).value === 'Clear Fields to Add'){
      (<HTMLInputElement>document.getElementById("addBtn")).value = 'Add Employee';
      this.boardsForm = this.formBuilder.group({
        'displayName' : [null, Validators.required],
        'email' : [null],
        'firstName' : [null],
        'lastName' : [null],
        'role' : [null, Validators.required],
        'uid' : [null]
      });
      this.boardsForm.controls['uid'].disable()
    }
    else {
      this.userService.createUser(this.boardsForm.value);
      this.boardsForm = this.formBuilder.group({
      'displayName' : [null, Validators.required],
      'email' : [null],
      'firstName' : [null],
      'lastName' : [null],
      'role' : [null, Validators.required],
      'uid' : [null],
    });
    this.boardsForm.controls['uid'].disable()
    this.getUser();
    }
    
  }

  // Runs when a user is selected from the list and delete is clicked
  // 1.Deletes the currently selected user
  deleteUser() {
    //need to have confirmation box
    this.userService.deleteUser(this.uid,this.userEmail,this.userPassword)
  }


  onFormSubmit(result) {

  }

  // Runs when a user's name is clicked in the manage list
  // 1.Pulls the user's details from the database and inserts them into the input fields
  // 2.Changes the add button's text to "Clear Fields to Add"
  pullUserDataClicked(id) {
    (<HTMLInputElement>document.getElementById("updateBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("deleteBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("passResetBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("addBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("addBtn")).value = 'Clear Fields to Add';
    this.userService.getOneUser(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if(tmp) {
        this.uid = id;
        this.userEmail = tmp.userEmail;
        this.userPassword = tmp.userPassword;
        this.boardsForm.setValue({
          uid: id,
          displayName: tmp.displayName?tmp.displayName:'',
          email:tmp.email,
          firstName: tmp.firstName?tmp.firstName:'',
          lastName: tmp.lastName?tmp.lastName:'',
          role: tmp.role?tmp.role:''
          
        });
        this.boardsForm.controls['uid'].disable()
      }
    })
  }




}
