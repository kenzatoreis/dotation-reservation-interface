package com.kenza.dotation.dotation_stage_barrid.model;
import jakarta.persistence.*;
import java.time.LocalDate;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.BinaryJdbcType;
@Entity
@Table(name = "dotat_reservation_enfant")
public class DotationReservationEnfant {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_reservation", nullable = false)
    private DotationReservation reservation;

    private String nom;
    private String prenom;
    private String cin;
    private LocalDate dateNaissance;
    private LocalDate dateCreation = LocalDate.now();
    private LocalDate dateActivation = LocalDate.now();
    private LocalDate dateDesactivation= LocalDate.now();
    private LocalDate dateMaj = LocalDate.now();
    private String souscStatut;
    private String numPasseport;
    private Double disponibleOc;
    private String numTicketOc;
    private Double montantDemande;
    private Double plafondApplique;
    private Double plafondMaxApplique;
    private String idGedPasseport;
    @JdbcType(BinaryJdbcType.class)
    @Column(name = "passport_file")
    private byte[] passportFile;

    public byte[] getPassportFile() {
        return passportFile;
    }
    public void setPassportFile(byte[] passportFile) {
        this.passportFile = passportFile;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DotationReservation getReservation() {
        return reservation;
    }

    public void setReservation(DotationReservation reservation) {
        this.reservation = reservation;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDate getDateActivation() {
        return dateActivation;
    }

    public void setDateActivation(LocalDate dateActivation) {
        this.dateActivation = dateActivation;
    }

    public LocalDate getDateDesactivation() {
        return dateDesactivation;
    }

    public void setDateDesactivation(LocalDate dateDesactivation) {
        this.dateDesactivation = dateDesactivation;
    }

    public LocalDate getDateMaj() {
        return dateMaj;
    }

    public void setDateMaj(LocalDate dateMaj) {
        this.dateMaj = dateMaj;
    }

    public String getSouscStatut() {
        return souscStatut;
    }

    public void setSouscStatut(String souscStatut) {
        this.souscStatut = souscStatut;
    }

    public String getNumPasseport() {
        return numPasseport;
    }

    public void setNumPasseport(String numPasseport) {
        this.numPasseport = numPasseport;
    }

    public Double getDisponibleOc() {
        return disponibleOc;
    }

    public void setDisponibleOc(Double disponibleOc) {
        this.disponibleOc = disponibleOc;
    }

    public String getNumTicketOc() {
        return numTicketOc;
    }

    public void setNumTicketOc(String numTicketOc) {
        this.numTicketOc = numTicketOc;
    }

    public Double getMontantDemande() {
        return montantDemande;
    }

    public void setMontantDemande(Double montantDemande) {
        this.montantDemande = montantDemande;
    }

    public Double getPlafondApplique() {
        return plafondApplique;
    }

    public void setPlafondApplique(Double plafondApplique) {
        this.plafondApplique = plafondApplique;
    }

    public Double getPlafondMaxApplique() {
        return plafondMaxApplique;
    }

    public void setPlafondMaxApplique(Double plafondMaxApplique) {
        this.plafondMaxApplique = plafondMaxApplique;
    }

    public String getIdGedPasseport() {
        return idGedPasseport;
    }

    public void setIdGedPasseport(String idGedPasseport) {
        this.idGedPasseport = idGedPasseport;
    }
}
