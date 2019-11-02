import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService  implements CanActivate {

  constructor(public authService: AuthService,
    public router: Router,
    public userService:UserService) {

     }
     role ='';
     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const user = this.authService.userData;
      if(user){
        this.getUserRole(user.uid).then(() => {
          if (this.role === 'Admin') {
            console.log(this.role)
            return true;
          } else {
            alert('Only Admin can have access to this page.')
            // navigate to not found page
            this.router.navigate(['/dashboard']);
            return false;
          }
          
        })
      }
        return true;
    }


    getUserRole (id:string) {
      return new Promise((resolve, reject) => {
      this.userService.getOneUser(id).subscribe(data => {
        const tmp: any = data.payload.data();
        if(tmp) {
            this.role=tmp.role
            
        }
        resolve("completed");
      })
    });
    }
}
