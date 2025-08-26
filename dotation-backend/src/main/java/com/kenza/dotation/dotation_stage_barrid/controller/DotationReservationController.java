package com.kenza.dotation.dotation_stage_barrid.controller;

import com.kenza.dotation.dotation_stage_barrid.model.DotationReservation;
import com.kenza.dotation.dotation_stage_barrid.service.DotationReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/dotations")
@CrossOrigin(origins = "*")
public class DotationReservationController {

    @Autowired
    private DotationReservationService reservationService;

    @PostMapping
    public DotationReservation createDotation(
            @RequestBody DotationReservation reservation,
            @RequestParam Long clientId,
            @RequestParam Long compteId
    ) {
        return reservationService.createReservation(reservation, clientId, compteId);
    }

    @PostMapping(
            value = "/{id}/upload-passport",
            consumes = "multipart/form-data",
            produces = "application/json"
    )
    public ResponseEntity<Map<String, String>> uploadPassport(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            reservationService.uploadPassport(id, file);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Passport uploaded successfully.");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "File processing error."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }






}
