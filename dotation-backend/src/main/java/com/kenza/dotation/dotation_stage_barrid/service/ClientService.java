package com.kenza.dotation.dotation_stage_barrid.service;

import com.kenza.dotation.dotation_stage_barrid.model.Client;
import com.kenza.dotation.dotation_stage_barrid.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Optional<Client> chercherClient(String typePiece, String numero) {
        System.out.println("Type reçu : " + typePiece);
        System.out.println("Numéro reçu : " + numero);

        return switch (typePiece.toUpperCase()) {
            case "CIN" -> {

                yield clientRepository.findByCinIgnoreCase(numero);
            }
            case "CARTE_SEJOUR" -> {

                yield clientRepository.findByCarteSejourIgnoreCase(numero);
            }
            default -> {
                System.out.println("Type non reconnu");
                yield Optional.empty();
            }
        };
    }

}