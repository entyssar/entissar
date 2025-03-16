import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EventsPage } from './events.page'; // Importez EventsPage

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: EventsPage }]), // Utilisez EventsPage
  ],
})
export class EventsPageModule {}