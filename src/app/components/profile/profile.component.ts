import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from 'src/app/user.model';
import { UserService } from '../../user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService,
              public userService: UserService,
              private formBuilder: FormBuilder) { }

              boardsForm: FormGroup;
  user: User;

  isEditing=false;
  uid='';
  role='';
  roleList =['Admin','Manager','User'];
  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'displayName' : [null, Validators.required],
      'email' : [null],
      'firstName' : [null],
      'lastName' : [null],
      'role' : [null, Validators.required],
      'uid' : [null, Validators.required],
    });
    this.boardsForm.disable()
    
    
    
  }

  edit(id:string){
    this.isEditing=true
    if(id){
      this.userService.getOneUser(id).subscribe(data => {
        const tmp: any = data.payload.data();
        if (tmp) {
          this.uid=id;
          this.role=tmp.role;
          this.boardsForm.setValue({
            displayName: tmp.displayName,
            email: tmp.email,
            firstName: tmp.firstName,
            lastName: tmp.lastName,
            role:tmp.role,
            uid: id
          });
        }
      })
      this.boardsForm.enable()
      this.boardsForm.controls['uid'].disable()
      this.boardsForm.controls['role'].disable()
    }
  }


  updateUser(){
    this.isEditing=false
    this.userService.updateUser(this.uid,{...this.boardsForm.value,role:this.role})
  }

}
