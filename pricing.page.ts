import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class PricingPage implements OnInit {
  abonnements: any[] = [];
  role: string = '';
  abonnementForm: any = {
    nom: '',
    prix: 0,
    duree: '',
    avantages: [],
  };
  isEditing: boolean = false;
  currentAbonnementId: number | null = null;
  paiement: any = {
    numeroCarte: '',
    dateExpiration: '',
    cvv: '',
  };
  historiquePaiements: any[] = [];
  abonnementSelectionne: any = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getUserRole();
    this.loadAbonnements();
    this.loadHistoriquePaiements();
  }

  loadAbonnements() {
    this.http.get('/api/abonnements').subscribe((data: any) => {
      this.abonnements = data;
    });
  }

  loadHistoriquePaiements() {
    this.http.get('/api/paiements').subscribe((data: any) => {
      this.historiquePaiements = data;
    });
  }

  addAbonnement() {
    this.http.post('/api/abonnements', this.abonnementForm).subscribe(() => {
      this.loadAbonnements();
      this.abonnementForm = {};
    });
  }

  modifierAbonnement(abonnement: any) {
    this.isEditing = true;
    this.currentAbonnementId = abonnement.id;
    this.abonnementForm = { ...abonnement };
  }

  updateAbonnement() {
    this.http.put(`/api/abonnements/${this.currentAbonnementId}`, this.abonnementForm).subscribe(() => {
      this.loadAbonnements();
      this.isEditing = false;
      this.abonnementForm = {};
    });
  }

  supprimerAbonnement(id: number) {
    this.http.delete(`/api/abonnements/${id}`).subscribe(() => {
      this.loadAbonnements();
    });
  }

  souscrire(id: number) {
    this.abonnementSelectionne = this.abonnements.find((a) => a.id === id);
  }

  effectuerPaiement() {
    this.http.post('/api/paiements', { ...this.paiement, abonnementId: this.abonnementSelectionne.id }).subscribe(() => {
      alert('Paiement réussi !');
      this.loadHistoriquePaiements();
    });
  }
}