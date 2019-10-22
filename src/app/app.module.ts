import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { ReportComponent } from './components/report/report.component';
import { ManageComponent } from './components/manage/manage.component';
import { ProfileComponent } from './components/profile/profile.component';
// FireBase
import { AngularFireDatabaseModule , AngularFireDatabase } from '@angular/fire/database';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CallbackPipe } from './shared/pipes/callback.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatListModule} from '@angular/material';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TravelItineraryService } from './travel-itinerary.service';
import { AddTravelItineraryComponent } from './components/add-travel-itinerary/add-travel-itinerary.component';
import { EditTravelItineraryComponent } from './components/edit-travel-itinerary/edit-travel-itinerary.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';

import { TripFilter } from './shared/pipes/trips.pipe'
import { FilterPipe } from './shared/pipes/filter.pipe';
import { niceDateFormatPipe } from './shared/pipes/nice-date-format.pipe';
import { EditTripComponent } from './components/edit-trip/edit-trip.component';
import { AddEventComponent } from './components/add-event/add-event.component'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ExcelService } from './excel.service';
// import { calendarComponent } from './components/time-table/calender/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    TimeTableComponent,
    ReportComponent,
    ManageComponent,
    ProfileComponent,
    AddTravelItineraryComponent,
    EditTravelItineraryComponent,
    AddTripComponent,
    TripFilter,
    FilterPipe,
    EditTripComponent,
    AddEventComponent,
    niceDateFormatPipe,
    // calendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    FilterPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [AuthService, AngularFireDatabase, TravelItineraryService,ExcelService],
  bootstrap: [AppComponent]
})

export class AppModule { }
