import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DotationReservationConjoint } from '../../models/dotation-reservation-conjoint.model';

@Component({
  selector: 'app-form-conjoint-dotation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-conjoint-dotation.component.html',
  styleUrls: ['./form-conjoint-dotation.component.css']
})
export class FormConjointDotationComponent {
  @Input() idReservation!: number;
  @Input() typeDotation: string = 'ecom';
  @Output() conjointSubmitted = new EventEmitter<DotationReservationConjoint>();

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
  typeClient: [''],
  typePi: ['CIN', Validators.required],
  numPi: ['', Validators.required],
  nom: ['', Validators.required],
  prenom: ['', Validators.required],
  numPasseport: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  disponibleOc: [0, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
  montantDemande: [0, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
  numTicketOc: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  souscStatut: ['A']
});

  }

  get plafondApplique(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 100000 : 0;
  }

  get plafondMax(): number {
    return this.typeDotation === 'ecom' ? 15000 : this.typeDotation === 'voyage' ? 300000 : 0;
  }

  onSubmit() {
    if (this.form.valid) {
      const { typeClient, ...formValues } = this.form.value;

      const payload: DotationReservationConjoint = {
        ...formValues,
        idReservation: this.idReservation,
        plafondApplique: this.plafondApplique,
        plafondMaxApplique: this.plafondMax
      };

      this.conjointSubmitted.emit(payload);
    } else {
      this.form.markAllAsTouched();
    }
  }
//filepass
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
  isValid(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
  

}
