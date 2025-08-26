package com.kenza.dotation.dotation_stage_barrid.controller;
import com.kenza.dotation.dotation_stage_barrid.model.DotationReservationEnfant;
import com.kenza.dotation.dotation_stage_barrid.model.DotationReservationEnfant;
import com.kenza.dotation.dotation_stage_barrid.service.DotationReservationEnfantService;
import com.kenza.dotation.dotation_stage_barrid.service.DotationReservationEnfantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
@RestController
@RequestMapping("/api/enfants")
@CrossOrigin(origins = "*")
public class DotationReservationEnfantController {
    @Autowired
    private DotationReservationEnfantService enfantService;

    @PostMapping
    public DotationReservationEnfant createEnfant(
            @RequestBody DotationReservationEnfant enfant,
            @RequestParam Long reservationId) {
        return enfantService.createEnfant(enfant, reservationId);
    }

    @PostMapping("/{id}/passport")
    public ResponseEntity<?> uploadEnfantPassport(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        enfantService.uploadPassport(id, file);
        return ResponseEntity.ok(Map.of("message", "Passport uploaded successfully."));
    }
}

