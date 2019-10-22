import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getOneUser(id) {
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }

  createUser(data: any) {
    return this.firestore.collection('users').add(data);
  }

  updateUser(id:string, data: any) {
    try{
      this.firestore.collection('users').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
  }

  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }

}
