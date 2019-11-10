import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore,
    public afAuth: AngularFireAuth) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getOneUser(id) {
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }

  createUser(data: any) {
    this.afAuth.auth.createUserWithEmailAndPassword(data.email,'Password123$').then((result) => {
      return this.firestore.collection('users').add({...data,emailVerified:true});
    }).catch((error) => {
      window.alert(error.message);
    });
    
  }

  updateUser(id:string, data: any) {
    try{
      this.firestore.collection('users').doc(id).set(data);
    } catch(err) {
      alert(err)
    }
  }

  async deleteUserData(id:String){
    this.firestore.doc('users/' + id).delete();
  }

}
