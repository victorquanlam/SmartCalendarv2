import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      alert('you just clicked enter');
      // rest of your code
    }
  }

}
