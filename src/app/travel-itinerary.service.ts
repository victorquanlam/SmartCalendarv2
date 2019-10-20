import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TravelItinerary } from 'src/app/travel-itinerary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelItineraryService {

  constructor(private firestore: AngularFirestore) { }

  getTravelItinerary() {
    return this.firestore.collection('TravelItinerary').snapshotChanges();
  }

  getOneTravelItinerary(id) {
    return this.firestore.collection('TravelItinerary').doc(id).snapshotChanges();
  }

  createTravelItinerary(data: any) {
    return this.firestore.collection('TravelItinerary').add(data);
  }

  updateTravelItinerary(id:string,data: any) {
    try{
      this.firestore.collection('TravelItinerary').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
    
  }

  deleteTravelItinerary(travelItineraryId: string) {
    this.firestore.doc('TravelItinerary/' + travelItineraryId).delete();
  }

}
