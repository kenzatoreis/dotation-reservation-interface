package com.kenza.dotation.dotation_stage_barrid.repository;

import com.kenza.dotation.dotation_stage_barrid.model.Compte;
import com.kenza.dotation.dotation_stage_barrid.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteRepository extends JpaRepository<Compte, Long> {
    List<Compte> findByClient(Client client);
}
