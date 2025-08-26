package com.kenza.dotation.dotation_stage_barrid.service;

import com.kenza.dotation.dotation_stage_barrid.model.Client;
import com.kenza.dotation.dotation_stage_barrid.model.Compte;
import com.kenza.dotation.dotation_stage_barrid.model.DotationReservation;
import com.kenza.dotation.dotation_stage_barrid.repository.ClientRepository;
import com.kenza.dotation.dotation_stage_barrid.repository.CompteRepository;
import com.kenza.dotation.dotation_stage_barrid.repository.DotationReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@Service
public class DotationReservationService {

    @Autowired
    private DotationReservationRepository reservationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CompteRepository compteRepository;

    public DotationReservation createReservation(DotationReservation reservation, Long clientId, Long compteId) {
        Optional<Client> client = clientRepository.findById(clientId);
        Optional<Compte> compte = compteRepository.findById(compteId);

        if (client.isEmpty() || compte.isEmpty()) {
            throw new IllegalArgumentException("Client ou compte introuvable.");
        }
        //Montant demandé
        if (reservation.getMontantDemande() >= reservation.getDisponibleOc()) {
            throw new IllegalArgumentException("Le montant demandé doit être inférieur au disponible OC.");
        }
        //alphanum
        String ticket = reservation.getNumTicketOc();
        if (ticket == null || ticket.isEmpty()) {
            throw new IllegalArgumentException("Le numéro de réservation est requis.");
        }

        for (int i = 0; i < ticket.length(); i++) {
            char c = ticket.charAt(i);
            if (!((c >= '0' && c <= '9') ||
                    (c >= 'a' && c <= 'z') ||
                    (c >= 'A' && c <= 'Z'))) {
                throw new IllegalArgumentException("Numéro de ticket doit être alphanumérique.");
            }
        }
        if (reservationRepository.findByNumTicketOc(ticket).isPresent()) {
            throw new IllegalArgumentException("Ce numéro de réservation existe déjà.");
        }
        // Appliquer plafonds
        switch (reservation.getTypeDotation().toLowerCase()) {
            case "ecom" -> {
                reservation.setPlafondApplique(15000.0);
                reservation.setPlafondMaxApplique(15000.0);
            }
            case "voyage" -> {
                reservation.setPlafondApplique(100000.0);
                reservation.setPlafondMaxApplique(300000.0);
            }
            default -> throw new IllegalArgumentException("Type de dotation invalide.");
        }
        reservation.setClient(client.get());
        reservation.setCompte(compte.get());
        reservation.setNumero_passport(reservation.getNumero_passport());

        return reservationRepository.save(reservation);

    }
    public DotationReservation findById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("DotationReservation not found."));
    }

    public DotationReservation save(DotationReservation reservation) {
        return reservationRepository.save(reservation);
    }
    public void uploadPassport(Long reservationId, MultipartFile file) throws IOException {
        DotationReservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found."));

        reservation.setPassportFile(file.getBytes());
        reservationRepository.save(reservation);
    }

}
