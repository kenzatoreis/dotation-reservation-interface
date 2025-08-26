import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DotationReservationEnfant } from '../../models/dotation-reservation-enfant.model';
import { DotationService } from '../../services/dotation.service';

@Component({
  selector: 'app-form-enfant-dotation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-enfant-dotation.component.html',
  styleUrls: ['./form-enfant-dotation.component.css']
})
export class FormEnfantDotationComponent {
  @Input() idReservation!: number;
  @Input() typeDotation: string = 'ecom';

  // @Output() enfantAdded = new EventEmitter<DotationReservationEnfant>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private dotationService: DotationService) {
    this.form = this.fb.group({
      typeClient: ['', Validators.required],
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      numPasseport: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      disponibleOc: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      montantDemande: [null, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      numTicketOc: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      idGedPasseport: [''],
      souscStatut: ['A']
    });
  }

  get plafondApplique(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 100000 : 0;
  }

  get plafondMax(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 300000 : 0;
  }

  @Output() enfantReady = new EventEmitter<DotationReservationEnfant>();

onSubmit() {
  if (this.form.valid) {
    const payload: DotationReservationEnfant = {
      ...this.form.value,
      idReservation: this.idReservation,
      plafondApplique: this.plafondApplique,
      plafondMaxApplique: this.plafondMax
    };
    this.enfantReady.emit(payload);
    this.form.reset();
  } else {
    this.form.markAllAsTouched();
  }
}



  isValid(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
  selectedFile?: File;

selectedFileName?: string;

    
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
@Output() cancelClicked = new EventEmitter<void>();

resetForm() {
  this.form.reset();
  this.selectedFile = undefined;
  this.selectedFileName = undefined;
  this.cancelClicked.emit(); // notif
}

}
