import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DotationService } from '../../services/dotation.service';
import { Client } from '../../models/client.model';
import { Compte } from '../../models/compte.model';

@Component({
  selector: 'app-search-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent {
  fb = inject(FormBuilder);
  dotationService = inject(DotationService);

  searchForm: FormGroup = this.fb.group({
    typePiece: ['CIN'],
    numero: [''],
    typeDotation: ['ecom']
  });

  clients: Client[] = [];
  errorMsg: string = '';

  @Output() clientSelected = new EventEmitter<{client: Client, typeDotation: string }>();
  @Output() cancelClicked = new EventEmitter<void>();
  onSearch() {
    const { typePiece, numero } = this.searchForm.value;
    this.dotationService.searchClient(typePiece, numero).subscribe({
      next: (client: Client) => {
        this.clients = [client];
        this.errorMsg = '';
      },
      error: () => {
        this.clients = [];
        this.errorMsg = 'Aucun client trouvé.';
      }
    });
  }

  onSelect(client: Client) {
    const typeDotation = this.searchForm.value.typeDotation
    this.clientSelected.emit({client, typeDotation});
  }
  onCancel() {
  this.searchForm.reset();
  this.clients = [];

  this.cancelClicked.emit(); 
}
}


