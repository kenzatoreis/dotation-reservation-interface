package com.kenza.dotation.dotation_stage_barrid.service;

import com.kenza.dotation.dotation_stage_barrid.model.DotationReservation;
import com.kenza.dotation.dotation_stage_barrid.model.DotationReservationEnfant;
import com.kenza.dotation.dotation_stage_barrid.repository.DotationReservationEnfantRepository;
import com.kenza.dotation.dotation_stage_barrid.repository.DotationReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class DotationReservationEnfantService {
    @Autowired
    private DotationReservationEnfantRepository enfantRepository;
    @Autowired
    private DotationReservationRepository reservationRepository;
    public DotationReservationEnfant createEnfant(DotationReservationEnfant enfant, Long reservationId) {
        Optional<DotationReservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isEmpty()) {
            throw new IllegalArgumentException("Réservation introuvable.");
        }
        enfant.setReservation(reservationOpt.get());
        return enfantRepository.save(enfant);
    }

    public void uploadPassport(Long id, MultipartFile file) throws IOException {
        DotationReservationEnfant enfant = enfantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enfant not found."));
        enfant.setPassportFile(file.getBytes());
        enfantRepository.save(enfant);
    }



}
