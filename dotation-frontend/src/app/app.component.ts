import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClientComponent } from './dotation/search-client/search-client.component';
import { WizardDotationComponent } from './dotation/wizard-dotation/wizard-dotation.component';
import { Client } from './models/client.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchClientComponent, WizardDotationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedClient: Client | null = null;
  selectedTypeDotation: string = 'ecom';

handleClientSelection(selection: { client: Client, typeDotation: string }) {
  this.selectedClient = selection.client;
  this.selectedTypeDotation = selection.typeDotation;
}
handleCancel() {
  this.selectedClient = null;  
}
}
