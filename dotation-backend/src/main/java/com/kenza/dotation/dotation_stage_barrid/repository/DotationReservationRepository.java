package com.kenza.dotation.dotation_stage_barrid.repository;

import com.kenza.dotation.dotation_stage_barrid.model.DotationReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DotationReservationRepository extends JpaRepository<DotationReservation, Long> {
    Optional<DotationReservation> findByNumTicketOc(String numTicketOc);
}
