import { Client } from './client.model';
export interface Compte {
  idCompte: number;
  numeroCompte: string;
  solde: number;
  client: Client;
}
