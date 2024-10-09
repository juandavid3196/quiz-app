import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(
    private firestore: AngularFirestore,
  ) {}

  // Crear una nueva partida
  createMatch(match:any) {
    return this.firestore.collection('matches').add(match);
  }

  // Obtener todas las partidas de un usuario
  getMatchesByUser(userId: string) {
    return this.firestore
      .collection('matches', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }

  // Obtener una partida específica por ID
  getMatchById(matchId: string) {
    return this.firestore.collection('matches').doc(matchId).valueChanges();
  }
}
