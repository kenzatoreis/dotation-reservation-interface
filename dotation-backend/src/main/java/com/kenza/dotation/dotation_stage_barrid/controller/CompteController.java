package com.kenza.dotation.dotation_stage_barrid.controller;

import com.kenza.dotation.dotation_stage_barrid.model.Compte;
import com.kenza.dotation.dotation_stage_barrid.service.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class CompteController {

    @Autowired
    private CompteService compteService;

    @GetMapping("/{idClient}/comptes")
    public List<Compte> getComptesByClientId(@PathVariable Long idClient) {
        return compteService.getComptesByClientId(idClient);
    }
}

