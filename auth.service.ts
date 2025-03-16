import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserRole(): string {
    // Implémentez la logique pour récupérer le rôle de l'utilisateur
    return 'membre'; // Exemple : retourne 'membre' ou 'admin'
  }
}