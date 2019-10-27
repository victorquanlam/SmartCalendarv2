import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Trip } from 'src/app/trip.model';
import { EventService } from 'src/app/event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private firestore: AngularFirestore, private eventService: EventService) { }

  getTrips() {
    return this.firestore.collection('Trips').snapshotChanges();
  }

  getTripsBaseOnItinerary(travelItinerary:string) {
    return this.firestore.collection('Trips', ref => ref.where('travelItinerary','==',travelItinerary)).snapshotChanges();
  }

  getOneTrip(id) {
    return this.firestore.collection('Trips').doc(id).snapshotChanges();
  }

  createTrip(data: any) {
    return this.firestore.collection('Trips').add(data);
  }

  updateTrip(id:string, data: any) {
    try{
      this.firestore.collection('Trips').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
  }

  async deleteTrips(travelItinerary: string) {
    try{
      await this.firestore.collection('Trips', ref => ref.where('travelItinerary','==',travelItinerary)).snapshotChanges().subscribe(
       data => data.forEach(doc => {
         this.deleteTrip(doc.payload.doc.id)
        })
      )
    } catch(err) {
       alert(err)
    }
  }

  deleteTrip(TripId: string) {
    this.firestore.doc('Trips/' + TripId).delete();
    this.eventService.deleteEvents(TripId)
  }

}
