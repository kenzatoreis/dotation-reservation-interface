package com.kenza.dotation.dotation_stage_barrid.service;

import com.kenza.dotation.dotation_stage_barrid.model.Client;
import com.kenza.dotation.dotation_stage_barrid.model.Compte;
import com.kenza.dotation.dotation_stage_barrid.repository.ClientRepository;
import com.kenza.dotation.dotation_stage_barrid.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompteService {

    @Autowired
    private CompteRepository compteRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Compte> getComptesByClientId(Long clientId) {
        Optional<Client> client = clientRepository.findById(clientId);
        return client.map(compteRepository::findByClient).orElse(List.of());
    }
}
