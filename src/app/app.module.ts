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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
  MatSlideToggleModule,
  MatDialogModule,
  MAT_DATE_LOCALE,
  MatListModule} from '@angular/material';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TravelItineraryService } from './travel-itinerary.service';
import { AddTravelItineraryComponent } from './components/add-travel-itinerary/add-travel-itinerary.component';
import { EditTravelItineraryComponent } from './components/edit-travel-itinerary/edit-travel-itinerary.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';

import { TripFilter } from './shared/pipes/trips.pipe'
import { FilterPipe } from './shared/pipes/filter.pipe';
import { EditTripComponent } from './components/edit-trip/edit-trip.component';
import { AddEventComponent } from './components/add-event/add-event.component'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { calendarComponent } from './components/time-table/calender/calendar.component';
import { niceDateFormatPipe } from './shared/pipes/nice-date-format.pipe';
import { ExcelService } from './excel.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { DialogContentExampleDialogComponent } from './components/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { AgmCoreModule } from '@agm/core';

import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { AgmDirectionModule } from 'agm-direction';
import { ServiceWorkerModule } from '@angular/service-worker';   // agm-direction
import { DatePipe } from '@angular/common';

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
    EditEventComponent,
    DialogContentExampleDialogComponent,
    calendarComponent
  ],
  imports: [
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
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
    MatSlideToggleModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatGoogleMapsAutocompleteModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9FgWueAc23WRmXqR-HhOsszPO1TQadA0',
      libraries: ['places']
    }),

    NgbModule.forRoot(),
    
    FilterPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [DialogContentExampleDialogComponent],
  providers: [AuthService, AngularFireDatabase, TravelItineraryService,ExcelService,{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-au'},{ provide: MAT_DATE_LOCALE, useValue: 'en-au' },DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
