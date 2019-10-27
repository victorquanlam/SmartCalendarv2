import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TravelItinerary } from 'src/app/travel-itinerary.model';
import { TripService } from 'src/app/trip.service';
import { ExpenseService } from 'src/app/expense.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelItineraryService {

  constructor(private firestore: AngularFirestore, private ts: TripService, private expenseService: ExpenseService) { }

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
    try{
      this.firestore.doc('TravelItinerary/' + travelItineraryId).delete();
      this.ts.deleteTrips(travelItineraryId)
      this.expenseService.deleteExpenses(travelItineraryId)
    } catch(err){
      alert(err)
    }
    
  }

}
