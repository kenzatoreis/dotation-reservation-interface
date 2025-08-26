package com.kenza.dotation.dotation_stage_barrid.service;

import com.kenza.dotation.dotation_stage_barrid.model.DotationReservation;
import com.kenza.dotation.dotation_stage_barrid.model.DotationReservationConjoint;
import com.kenza.dotation.dotation_stage_barrid.repository.DotationReservationConjointRepository;
import com.kenza.dotation.dotation_stage_barrid.repository.DotationReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
@Service
public class DotationReservationConjointService {

    @Autowired
    private DotationReservationConjointRepository conjointRepository;

    @Autowired
    private DotationReservationRepository reservationRepository;

    public DotationReservationConjoint createConjoint(DotationReservationConjoint conjoint, Long reservationId) {
        Optional<DotationReservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isEmpty()) {
            throw new IllegalArgumentException("Réservation introuvable.");
        }
        conjoint.setReservation(reservationOpt.get());
        return conjointRepository.save(conjoint);
    }
    public void uploadPassport(Long id, MultipartFile file) throws IOException {
        DotationReservationConjoint conjoint = conjointRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Conjoint not found."));
        conjoint.setPassportFile(file.getBytes());
        conjointRepository.save(conjoint);
    }

}


