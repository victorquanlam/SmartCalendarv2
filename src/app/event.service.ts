import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from 'src/app/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: AngularFirestore) { }

  getEvents() {
    return this.firestore.collection('Events').snapshotChanges();
  }

  getEventsBaseOnTrip(trip:string) {
    return this.firestore.collection('Events', ref => ref.where('trip','==',trip)).snapshotChanges();
    
  }

  getOneEvent(id) {
    return this.firestore.collection('Events').doc(id).snapshotChanges();
  }

  createEvent(data: any) {
    try{
      return this.firestore.collection('Events').add(data);
    } catch(err){
      alert(err)
    }
    
  }

  updateEvent(id:string, data: any) {
    try{
      this.firestore.collection('Events').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
  }

  async deleteEvents(trip: string){
    try{
      await this.firestore.collection('Events', ref => ref.where('trip','==',trip)).snapshotChanges().subscribe(
       data => data.forEach(doc => {
         console.log(doc)
         this.deleteEvent(doc.payload.doc.id)
        })
      )
    } catch(err) {
       alert(err)
    }
  }

  deleteEvent(EventId: string) {
    this.firestore.doc('Events/' + EventId).delete();
  }
}
