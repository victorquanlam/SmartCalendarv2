import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Trip } from 'src/app/trip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private firestore: AngularFirestore) { }

  getTrips() {
    return this.firestore.collection('Trips').snapshotChanges();
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

  deleteTrip(TripId: string) {
    this.firestore.doc('Trips/' + TripId).delete();
  }

}
