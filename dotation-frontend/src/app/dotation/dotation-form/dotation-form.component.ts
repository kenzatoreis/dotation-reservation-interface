import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { Compte } from '../../models/compte.model';
import { DotationService } from '../../services/dotation.service';
import { DotationReservation } from '../../models/dotation-reservation.model';

@Component({
  selector: 'app-dotation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dotation-form.component.html',
  styleUrls: ['./dotation-form.component.css']
})
export class DotationFormComponent implements OnChanges {
  @Input() client!: Client;
  @Input() typeDotation: string = 'ecom';
  @Output() formSubmitted = new EventEmitter<DotationReservation>();

  comptes: Compte[] = [];
  form: FormGroup;
  private formbuilder = inject(FormBuilder);
  private dotationService = inject(DotationService);
  selectedFile?: File;
createdDotationId?: number;
selectedFileName?: string;
  constructor() {
    this.form = this.formbuilder.group({
      montantDemande: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      numTicketOc: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      montantConsomme: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      disponibleOc: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      numero_passport: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      compte: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['client'] && this.client?.idClient) {
      this.dotationService.getComptesByClient(this.client.idClient).subscribe({
        next: (data) => {
          this.comptes = data;
        },
        error: (err) => {
          console.error('Failed to load comptes:', err);
        }
      });
    }
  }
  //file
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    this.selectedFile = input.files[0];
    this.selectedFileName = input.files[0].name;
    
  
  }
}
getSelectedPassport(): File | undefined {
  return this.selectedFile;
}


  get plafondDotation(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 100000 : 0;
  }

  get plafondMax(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 300000 : 0;
  }

  onSubmit() {
    if (this.form.valid && this.client) {
      const payload: DotationReservation = {
        typeDotation: this.typeDotation,
        numTicketOc: this.form.value.numTicketOc,
        montantDemande: this.form.value.montantDemande,
        montantConsomme: this.form.value.montantConsomme,
        disponibleOc: this.form.value.disponibleOc,
        plafondApplique: this.plafondDotation,
        plafondMaxApplique: this.plafondMax,
        numero_passport: this.form.value.numero_passport,
        client: this.client,
        compte: { idCompte: this.form.value.compte } as Compte
      };

      this.formSubmitted.emit(payload);
    } else {
      this.form.markAllAsTouched();
    }
  }

  isValid(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
}
