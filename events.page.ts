import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class EventsPage implements OnInit {
  evenements: any[] = [];
  role: string = ''; // Rôle de l'utilisateur (admin, membre)
  eventForm: any = {
    nom: '',
    date: '',
    heure: '',
    lieu: '',
    description: '',
  };
  isEditing: boolean = false;
  currentEventId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getUserRole(); // Récupérer le rôle de l'utilisateur
    this.loadEvents();
  }

  loadEvents() {
    this.http.get('/api/evenements').subscribe((data: any) => {
      this.evenements = data;
    });
  }

  addEvent() {
    this.http.post('/api/evenements', this.eventForm).subscribe(() => {
      this.loadEvents();
      this.eventForm = {}; // Réinitialiser le formulaire
    });
  }

  modifierEvent(event: any) {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.eventForm = { ...event };
  }

  updateEvent() {
    this.http.put(`/api/evenements/${this.currentEventId}`, this.eventForm).subscribe(() => {
      this.loadEvents();
      this.isEditing = false;
      this.eventForm = {}; // Réinitialiser le formulaire
    });
  }

  supprimerEvent(id: number) {
    this.http.delete(`/api/evenements/${id}`).subscribe(() => {
      this.loadEvents();
    });
  }

  sInscrire(id: number) {
    this.http.post(`/api/evenements/${id}/inscrire`, {}).subscribe(() => {
      alert('Inscription réussie !');
      this.loadEvents();
    });
  }
}
export const environment = {
  production: false,
  firebase: {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID",
  },
};