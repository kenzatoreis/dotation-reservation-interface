package com.kenza.dotation.dotation_stage_barrid.controller;

import com.kenza.dotation.dotation_stage_barrid.model.DotationReservationConjoint;
import com.kenza.dotation.dotation_stage_barrid.service.DotationReservationConjointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
@RestController
@RequestMapping("/api/conjoints")
@CrossOrigin(origins = "*")
public class DotationReservationConjointController {

    @Autowired
    private DotationReservationConjointService conjointService;

    @PostMapping
    public DotationReservationConjoint createConjoint(
            @RequestBody DotationReservationConjoint conjoint,
            @RequestParam Long reservationId) {
        return conjointService.createConjoint(conjoint, reservationId);
    }
    @PostMapping("/{id}/passport")
    public ResponseEntity<?> uploadConjointPassport(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        conjointService.uploadPassport(id, file);
        return ResponseEntity.ok(Map.of("message", "Passport uploaded successfully."));
    }

}