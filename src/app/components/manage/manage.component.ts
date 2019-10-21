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
    
  constructor(private userService: UserService,
    private router: Router, private route: ActivatedRoute,
    private ts: TravelItineraryService, private formBuilder: FormBuilder,
    public authService: AuthService) { }

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

  updateUser(){
    this.userService.updateUser(this.uid, this.boardsForm)
  }

  sendPasswordReset () {
    var email =(<HTMLInputElement>document.getElementById("email")).value;
    //auth.sendPasswordResetEmail(email);
    alert('A password reset email has been sent to: ' + email);
          
  }

  addUser() {
    this.userService.createUser(this.boardsForm);
    this.boardsForm = this.formBuilder.group({
      'displayName' : [null, Validators.required],
      'email' : [null],
      'firstName' : [null],
      'lastName' : [null],
      'role' : [null, Validators.required],
      'uid' : [null, Validators.required],
    });
  }

  deleteUser() {
    //need to have confirmation box
    this.userService.deleteUser(this.uid)
  }

  pullUserDataClicked(id) {
    (<HTMLInputElement>document.getElementById("updateBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("deleteBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("deletepassResetBtnBtn")).disabled =false;
    (<HTMLInputElement>document.getElementById("addBtn")).disabled =true;
    (<HTMLInputElement>document.getElementById("addBtn")).value = 'Clear Fields to Add';
    this.userService.getOneUser(id).subscribe(data => {
      const tmp: any = data.payload.data();
      if(tmp) {
        this.uid = tmp.uid;
        this.boardsForm.setValue({
          displayName: tmp.displayName?tmp.displayName:'',
          email:tmp.email,
          firstName: tmp.firstName?tmp.firstName:'',
          lastName: tmp.lastName?tmp.lastName:'',
          role: tmp.role?tmp.role:'',
          uid: tmp.uid
        });
        this.boardsForm.controls['uid'].disable()
      }
    })
  }




}
