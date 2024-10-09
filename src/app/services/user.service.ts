import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  
  getUserById(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  getAllUsers(): Observable<any[]> {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data : any = a.payload.doc.data(); // Datos del documento
        const id = a.payload.doc.id; // ID del documento
        return { id, ...data }; // Devuelve los datos junto con el ID
      }))
    );
  }
  

  addUser(user: any) {
    return this.firestore.collection('users').add(user); 
  }

  updateUser(userId: string, updatedData: any) {
    return this.firestore.collection('users').doc(userId).update(updatedData);
  }

  deleteUser(userId: string) {
    return this.firestore.collection('users').doc(userId).delete();
  }

}
