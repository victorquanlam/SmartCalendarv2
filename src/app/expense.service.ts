import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Trip } from 'src/app/trip.model';
import { EventService } from 'src/app/event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private firestore: AngularFirestore, private eventService: EventService) { }

  getExpense(travelItinerary:string) {
    return this.firestore.collection('Expenses', ref => ref.where('travelItinerary','==',travelItinerary)).snapshotChanges();
  }

  createExpense(data: any) {
    console.log(data)
    return this.firestore.collection('Expenses').add(data);
  }

  getOneExpense(id) {
    return this.firestore.collection('Expenses').doc(id).snapshotChanges();
  }

  updateExpense(id:string, data: any) {
    try{
      this.firestore.collection('Expenses').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
  }

  async deleteExpenses(travelItinerary: string) {
    try{
      await this.firestore.collection('Expenses', ref => ref.where('travelItinerary','==',travelItinerary)).snapshotChanges().subscribe(
       data => data.forEach(doc => {
         this.deleteExpense(doc.payload.doc.id)
        })
      )
    } catch(err) {
       alert(err)
    }
  }

  deleteExpense(id: string) {
    this.firestore.doc('Expenses/' + id).delete();
  }
}
