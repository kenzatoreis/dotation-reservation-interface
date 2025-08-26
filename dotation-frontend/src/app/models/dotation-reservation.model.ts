import { Client } from './client.model';
import { Compte } from './compte.model';
export interface DotationReservation {
  
  id?: number;
  client: Client;
  compte: Compte;
  typeDotation: string;
  dateCreation?: string;
  statut?: string;
  disponibleOc: number;
  numTicketOc: string;
  montantDemande: number;
  plafondApplique: number;
  plafondMaxApplique: number;
  montantConsomme: number;
  numero_passport: string;
  passport_file?: Blob;

}
