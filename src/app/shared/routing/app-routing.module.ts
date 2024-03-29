import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TimeTableComponent } from '../../components/time-table/time-table.component';
import { ReportComponent } from '../../components/report/report.component';
import { ManageComponent } from '../../components/manage/manage.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { AddTravelItineraryComponent } from '../../components/add-travel-itinerary/add-travel-itinerary.component';
import { AddTripComponent } from '../../components/add-trip/add-trip.component';
import { AddEventComponent } from '../../components/add-event/add-event.component';
import { EditEventComponent } from '../../components/edit-event/edit-event.component';
import { EditTravelItineraryComponent } from '../../components/edit-travel-itinerary/edit-travel-itinerary.component';
import { EditTripComponent } from '../../components/edit-trip/edit-trip.component';

// Import canActivate guard services
import { SecureInnerPagesGuard } from '../../shared/guard/secure-inner-pages.guard';
import { AuthGuard } from '../guard/auth.guard';
import { RoleGuardService } from '../guard/role-guard.service';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-travel-itinerary', component: AddTravelItineraryComponent, canActivate: [AuthGuard] },
  { path: 'add-trip/:id', component: AddTripComponent, canActivate: [AuthGuard] },
  { path: 'add-event/:id', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'edit-travel-itinerary/:id', component: EditTravelItineraryComponent, canActivate: [AuthGuard] },
  { path: 'edit-trip/:id', component: EditTripComponent, canActivate: [AuthGuard] },
  { path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard] },
  { path: 'time-table', component: TimeTableComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard,RoleGuardService],data: {role: 'Admin'}},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
