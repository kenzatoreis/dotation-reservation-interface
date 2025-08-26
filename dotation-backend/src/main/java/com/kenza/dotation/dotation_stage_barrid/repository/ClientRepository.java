package com.kenza.dotation.dotation_stage_barrid.repository;

import com.kenza.dotation.dotation_stage_barrid.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByCinIgnoreCase(String cin);
    Optional<Client> findByCarteSejourIgnoreCase(String carteSejour);
}
