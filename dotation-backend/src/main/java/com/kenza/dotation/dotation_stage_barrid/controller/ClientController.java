package com.kenza.dotation.dotation_stage_barrid.controller;

import com.kenza.dotation.dotation_stage_barrid.service.ClientService;
import com.kenza.dotation.dotation_stage_barrid.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<?> getClientByPiece(
            @RequestParam String typePiece,
            @RequestParam String numero
    ) {
        System.out.println("Recherche client : " + typePiece + " - " + numero);
        return clientService.chercherClient(typePiece, numero)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
