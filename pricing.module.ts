import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PricingPage } from './pricing.page'; // Importez PricingPage

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: PricingPage }]), // Utilisez PricingPage
  ],
})
export class PricingPageModule {}