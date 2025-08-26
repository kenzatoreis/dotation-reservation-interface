import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Compte } from '../models/compte.model';
import { DotationReservation } from '../models/dotation-reservation.model';
import { DotationReservationConjoint } from '../models/dotation-reservation-conjoint.model';
import { DotationReservationEnfant } from '../models/dotation-reservation-enfant.model';

@Injectable({
  providedIn: 'root'
})
export class DotationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  searchClient(typePiece: string, numero: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/clients?typePiece=${typePiece}&numero=${numero}`);
  }

  getComptesByClient(clientId: number): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.baseUrl}/clients/${clientId}/comptes`);
  }

  createDotation(reservation: DotationReservation, clientId: number, compteId: number): Observable<DotationReservation> {
    return this.http.post<DotationReservation>(
      `${this.baseUrl}/dotations?clientId=${clientId}&compteId=${compteId}`, reservation
    );
  }
  createConjointReservation(conjoint: DotationReservationConjoint, reservationId: number) {
  return this.http.post<DotationReservationConjoint>(
    `${this.baseUrl}/conjoints?reservationId=${reservationId}`, 
    conjoint
  );
}
createEnfantReservation(payload: DotationReservationEnfant, reservationId: number) {
  return this.http.post<DotationReservationEnfant>(
    `${this.baseUrl}/enfants?reservationId=${reservationId}`,
    payload
  );
}
uploadPassport(id: number, file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${this.baseUrl}/dotations/${id}/upload-passport`, formData, {
    responseType: 'text'
  });
}
uploadPassportConjoint(conjointId: number, file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/conjoints/${conjointId}/passport`, formData, {
    responseType: 'text'
  });
}

uploadPassportEnfant(enfantId: number, file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/enfants/${enfantId}/passport`, formData, {
    responseType: 'text'
  });
}


}
