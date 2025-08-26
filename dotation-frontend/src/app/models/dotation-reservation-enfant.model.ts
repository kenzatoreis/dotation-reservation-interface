export interface DotationReservationEnfant {
 id?: number;
  idReservation: number;
  cin: string;
  numPi: string;
  nom: string;
  prenom: string;
  dateNaissance?: string;
  dateCreation?: string;
  dateActivation?: string;
  dateDesactivation?: string;
  dateMaj?: string;
  souscStatut: string;
  numPasseport?: string;
  disponibleOc: number;
  numTicketOc?: string;
  montantDemande: number;
  plafondApplique: number;
  plafondMaxApplique: number;
  idGedPasseport?: string;
  passport_file?: Blob;
}