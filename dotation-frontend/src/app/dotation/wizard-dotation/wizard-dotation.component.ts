import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { DotationFormComponent } from '../dotation-form/dotation-form.component';
import { FormConjointDotationComponent } from '../form-conjoint-dotation/form-conjoint-dotation.component';
import { FormEnfantDotationComponent } from '../form-enfant-dotation/form-enfant-dotation.component';
import { DotationService } from '../../services/dotation.service';
import { Client } from '../../models/client.model';
import { DotationReservation } from '../../models/dotation-reservation.model';
import { DotationReservationConjoint } from '../../models/dotation-reservation-conjoint.model';
import { DotationReservationEnfant } from '../../models/dotation-reservation-enfant.model';
import jsPDF from 'jspdf';
import '../../../assets/fonts/Amiri-Regular-normal';
@Component({
  selector: 'app-wizard-dotation',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    DotationFormComponent,
    FormConjointDotationComponent,
    FormEnfantDotationComponent
  ],
  templateUrl: './wizard-dotation.component.html',
  styleUrls: ['./wizard-dotation.component.css']
})
export class WizardDotationComponent {
  @Input() client!: Client;
  @Input() typeDotation: string = 'ecom';

  dotationId!: number;
  titulaireSaved = false;
  conjointSaved = false;
  enfantSaved = false;

  titulaireData!: DotationReservation;
  conjointData?: DotationReservationConjoint;
  enfantData?: DotationReservationEnfant;
  enfants: DotationReservationEnfant[] = [];

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private dotationService: DotationService) {}

  @ViewChild(DotationFormComponent)
  titulaireFormComponent!: DotationFormComponent;

  @ViewChild(FormConjointDotationComponent)
  conjointFormComponent!: FormConjointDotationComponent;

  @ViewChild(FormEnfantDotationComponent)
  enfantFormComponent!: FormEnfantDotationComponent;

  onTitulaireSubmit(data: DotationReservation) {
    this.titulaireData = data;
  }

  onConjointSubmit(data: DotationReservationConjoint | null) {
    this.conjointData = data || undefined;
  }

  
  hasConjointData(): boolean {
    return !!this.conjointData;
  }

  validateTitulaire() {
    if (!this.titulaireFormComponent) return;
    this.titulaireFormComponent.onSubmit();

    setTimeout(() => {
      if (!this.titulaireData) {
        this.errorMessage = 'Formulaire invalide. Veuillez remplir tous les champs obligatoires.';
        this.successMessage = '';
        return;
      }

      
    const cleanTitulaire = { ...this.titulaireData };
    delete cleanTitulaire.passport_file;

    this.dotationService.createDotation(
      cleanTitulaire,
      this.titulaireData.client.idClient,
      this.titulaireData.compte.idCompte
    ).subscribe({
      next: (savedTitulaire: any) => {
        this.dotationId = savedTitulaire.id;
        this.titulaireSaved = true;
        this.successMessage = 'Titulaire enregistré avec succès.';
        this.errorMessage = '';

        // 🔹 Upload the file AFTER saving
        const selectedPassport = this.titulaireFormComponent.getSelectedPassport();
        if (selectedPassport) {
          this.dotationService.uploadPassport(this.dotationId, selectedPassport).subscribe({
            next: () => console.log('Passeport uploadé'),
            error: (err) => console.error('Erreur upload passeport', err)
          });
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Erreur lors de l’enregistrement du titulaire : ' + (err.error?.message || err.message);
        this.successMessage = '';
      }
    });
  }, 0);
}

  // validateConjoint() {
  //   if (!this.conjointFormComponent) return;

  //   this.conjointFormComponent.onSubmit();

  //   setTimeout(() => {
  //     if (!this.conjointData) {
  //       this.errorMessage = 'Formulaire invalide. Veuillez remplir tous les champs obligatoires.';
  //       this.successMessage = '';
  //       return;
  //     }

  //     if (!this.conjointFormComponent.isValid()) {
  //       this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire conjoint.';
  //       this.successMessage = '';
  //       return;
  //     }

  //     this.dotationService.createConjointReservation({
  //       ...this.conjointData,
  //       idReservation: this.dotationId
  //     }, this.dotationId).subscribe({
  //       next: () => {
  //         this.conjointSaved = true;
  //         this.successMessage = 'Conjoint enregistré avec succès.';
  //         this.errorMessage = '';
  //       },
  //       error: (err: any) => {
  //         this.errorMessage = 'Erreur lors de l’enregistrement du conjoint : ' + (err.error?.message || err.message);
  //         this.successMessage = '';
  //       }
  //     });
  //   }, 0);
  // }
  
  validateConjoint() {
  if (!this.conjointFormComponent) return;

  this.conjointFormComponent.onSubmit();

  setTimeout(() => {
    if (!this.conjointData) {
      this.errorMessage = 'Formulaire invalide. Veuillez remplir tous les champs obligatoires.';
      this.successMessage = '';
      return;
    }

    if (!this.conjointFormComponent.isValid()) {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire conjoint.';
      this.successMessage = '';
      return;
    }

    const cleanConjoint = { ...this.conjointData };
    delete cleanConjoint['passport_file']; 

    this.dotationService.createConjointReservation(
  { ...cleanConjoint, idReservation: this.dotationId },
  this.dotationId
).subscribe({
  next: (savedConjoint: any) => {
    this.conjointSaved = true;
    this.successMessage = 'Conjoint enregistré avec succès.';
    this.errorMessage = '';

    const selectedPassport = this.conjointFormComponent.getSelectedPassport();

    const conjointId = savedConjoint.idConjoint || savedConjoint.id || savedConjoint['id_conjoint'];

    
    if (selectedPassport && conjointId) {
      this.dotationService.uploadPassportConjoint(conjointId, selectedPassport).subscribe({
        next: () => console.log('✅ Passeport du conjoint uploadé'),
        error: (err) => console.error('❌ Échec de l\'upload du passeport conjoint', err)
      });
    } else {
      console.error('⚠️ ID du conjoint introuvable ou fichier manquant :', savedConjoint);
    }
  },
  error: (err: any) => {
    this.errorMessage = 'Erreur lors de l’enregistrement du conjoint : ' + (err.error?.message || err.message);
    this.successMessage = '';
  }
});
  }, 0);
}

//   onEnfantSubmit(enfant: DotationReservationEnfant) {
//   this.dotationService.createEnfantReservation(enfant, this.dotationId).subscribe({
//     next: (saved: DotationReservationEnfant) => {
//       this.enfants.push(saved);
//       this.successMessage = 'Enfant ajouté avec succès.';
//       this.errorMessage = '';
//     },
//     error: (err) => {
//       this.errorMessage = 'Erreur lors de l’ajout de l’enfant : ' + (err.error?.message || err.message);
//       this.successMessage = '';
//     }
//   });
// }
onEnfantSubmit(enfant: DotationReservationEnfant) {
  this.dotationService.createEnfantReservation(enfant, this.dotationId).subscribe({
    next: (savedEnfant: any) => {
      this.enfants.push(savedEnfant);
      this.successMessage = 'Enfant ajouté avec succès.';
      this.errorMessage = '';

      const selectedPassport = this.enfantFormComponent.getSelectedPassport();

      
      const enfantId = savedEnfant.idEnfant || savedEnfant.id || savedEnfant['id_enfant'];

      if (selectedPassport && enfantId) {
        this.dotationService.uploadPassportEnfant(enfantId, selectedPassport).subscribe({
          next: () => console.log('✅ Passeport enfant uploadé'),
          error: (err) => console.error('Erreur upload passeport enfant', err)
        });
      } else {
        console.error('⚠️ ID enfant introuvable ou fichier manquant :', savedEnfant);
      }
    },
    error: (err) => {
      this.errorMessage = 'Erreur lors de l’ajout de l’enfant : ' + (err.error?.message || err.message);
      this.successMessage = '';
    }
  });
}
onEnfantCancel() {

  console.log('Child form cancelled.');
}

generatePDF() {
  
  if (!this.titulaireData) return;

  const d = this.titulaireData;
  const conjoint = this.conjointData;
  const enfants = this.enfants;

  const doc = new jsPDF('p', 'mm', 'a4');
doc.setFont('Amiri-Regular');

  const check = 'V';
  const cross = 'X';

  const ecomCheck = d.typeDotation === 'ecom' ? check : cross;
  const voyageCheck = d.typeDotation === 'voyage' ? check : cross;

  const hasConjoint = !!conjoint;
  const hasEnfants = enfants.length > 0;
  const totalMontantEnfants = enfants.reduce((sum, e) => sum + (e.montantDemande || 0), 0);

  let y = 15;

// Header
doc.setFontSize(16);
doc.text('LOREM IPSUM', 20, y);

doc.setFontSize(14);
y += 6;
doc.text('Lorem ipsum dolor sit amet', 105, y, { align: 'center' });
y += 6;

doc.setFontSize(11);
doc.text(`ACTIVATION ${check}`, 20, y);
y += 7;

// --- IDENTIFICATION ---
doc.setFillColor(220, 230, 241);
doc.rect(20, y, 170, 8, 'F');
doc.setFontSize(11);
doc.text('IDENTIFICATION', 22, y + 5);
y += 12;

doc.setFontSize(8);
const fields = [
  { label: "Agence :", value: "99930" },
  { label: "Compte :", value: d.compte.numeroCompte },
  { label: "Nom :", value: d.client.nom },
  { label: "Prénom :", value: d.client.prenom },
  { label: "CIN :", value: d.client.cin || d.client.carteSejour },
  { label: "Passeport :", value: d.numero_passport || '' },
  { label: "Téléphone :", value: '' }
];

fields.forEach(f => {
  doc.text(`${f.label} ${f.value}`, 22, y);
  y += 7;
});

// --- DOTATIONS ---
y += 4;
doc.setFillColor(220, 230, 241);
doc.rect(20, y, 170, 8, 'F');
doc.setFontSize(11);
doc.text('DOTATIONS', 22, y + 5);
y += 12;

doc.setFontSize(8);
doc.text(`Nature et montant activé :`, 22, y);
y += 7;

doc.text(`Numéro de ticket : ${d.numTicketOc}`, 22, y); y += 7;
doc.text(`E-commerce : ${ecomCheck}`, 22, y);
doc.text(`Montant : ${d.typeDotation === 'ecom' ? d.montantDemande : 0} MAD`, 120, y); y += 6;
doc.text(`Voyage : ${voyageCheck}`, 22, y);
doc.text(`Montant : ${d.typeDotation === 'voyage' ? d.montantDemande : 0} MAD`, 120, y);
doc.text(`IR : ${cross}`, 160, y); y += 6;
doc.text(`Enfants : ${hasEnfants ? check : cross}`, 22, y);
doc.text(`Montant : ${hasEnfants ? totalMontantEnfants : 0} MAD`, 120, y); y += 10;

// --- FAMILY DOTATION BLOCK ---
doc.setFillColor(220, 230, 241);
doc.rect(20, y, 170, 8, 'F');
doc.setFontSize(11);
doc.text('Lorem ipsum dolor sit amet', 22, y + 5);
y += 10;

// --- CONJOINT ---
doc.setFillColor(220, 230, 241);
doc.rect(20, y, 170, 8, 'F');
doc.setFontSize(11);
doc.text('INFORMATIONS CONJOINT', 22, y + 5);
y += 12;

doc.setFontSize(8);
const conjointFields = [
  { label: 'Nom conjoint', value: conjoint?.nom || '' },
  { label: 'Prénom conjoint', value: conjoint?.prenom || '' },
  { label: 'Pièce d\'identité', value: conjoint?.numPi || '' },
  { label: 'Passeport', value: conjoint?.numPasseport || '' },
  { label: 'Montant', value: `${conjoint?.montantDemande}` || '' },
  { label: 'Numéro de ticket', value: conjoint?.numTicketOc || '' }
];

conjointFields.forEach(f => {
  doc.text(`${f.label} : ${f.value}`, 22, y); 
  y += 5;
});
y += 4;

// --- FRAIS DE GESTION DOTATION ---
doc.setFontSize(12);
doc.text('FRAIS DE GESTION DOTATION', 22, y); y += 7;

doc.setFontSize(8);
doc.text('Nature de l’opération', 22, y);
doc.text('ACTIVATION', 75, y);
doc.text('Montant des frais', 145, y);
doc.text('15', 180, y); 
y += 8;

// --- COMMITMENTS & CNDP NOTICE ---
doc.setFontSize(5);
doc.setDrawColor(0);
doc.rect(20, y, 170, 10);

doc.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 22, y + 6);
y += 10;

doc.rect(20, y, 170, 10);
doc.text('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 22, y + 6);
y += 12;

// --- SIGNATURE BOXES ---
doc.text('DATE ET SIGNATURES', 105, y, { align: 'left' });
y += 4;

// Rectangles for client and bank signature
doc.rect(20, y, 85, 10);  
doc.rect(105, y, 85, 10); 

doc.setFontSize(5);
doc.text('Cadre réservé au client', 22, y + 6);
doc.text('Cadre réservé à la banque', 188, y + 6, { align: 'right' });
y += 10;

doc.setFontSize(6);
doc.setDrawColor(0);

doc.rect(20, y, 85, 10);  
doc.rect(105, y, 85, 10); 
doc.text('Fait à : ____________    Le : ____________', 22, y + 3);
doc.text('Signature du client (lu et approuvé)', 22, y + 7);
y += 10;

doc.rect(20, y, 85, 20);  
doc.rect(105, y, 85, 20); 

const footerFr = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  'Cillum dolore eu fugiat nulla pariatur.'
];

footerFr.forEach((line, i) => {
  doc.text(line, 22, y + 5 + (i * 4));
});



// footerAr.forEach((line, i) => {
//   doc.text(line, 188, y + 4 + i * 3.5, { align: 'right' });
// });

  const dateStr = new Date().toLocaleDateString();
  doc.save(`recu_dotation_${d.client.nom}_${d.client.prenom}_${dateStr}.pdf`);

}


  
}
