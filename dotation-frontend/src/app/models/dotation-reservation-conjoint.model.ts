export interface DotationReservationConjoint {
  id?: number;
  idReservation: number;
  typePi: string;
  numPi: string;
  nom: string;
  prenom: string;
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
