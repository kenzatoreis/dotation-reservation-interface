package com.kenza.dotation.dotation_stage_barrid.model;
import jakarta.persistence.*;
import java.time.LocalDate;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.BinaryJdbcType;
@Entity
@Table(name = "dotat_reservation")
public class DotationReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idenclie", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "idencomp", nullable = false)
    private Compte compte;

    private String typeDotation;

    private LocalDate dateCreation = LocalDate.now();

    private String statut = "A";

    private Double disponibleOc;

    @Column(unique = true)
    private String numTicketOc;

    private Double montantDemande;

    private Double plafondApplique;

    private Double plafondMaxApplique;

    private Double montantConsomme;

    private String numero_passport;
    @JdbcType(BinaryJdbcType.class) // 🔧 Force bytea
    @Column(name = "passport_file")
    private byte[] passportFile;

    public byte[] getPassportFile() {
        return passportFile;
    }
    public void setPassportFile(byte[] passportFile) {
        this.passportFile = passportFile;
    }

    public String getNumero_passport() {
        return numero_passport;
    }

    public void setNumero_passport(String numero_passport) {
        this.numero_passport = numero_passport;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public String getTypeDotation() {
        return typeDotation;
    }

    public void setTypeDotation(String typeDotation) {
        this.typeDotation = typeDotation;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
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

    public Double getMontantConsomme() {
        return montantConsomme;
    }

    public void setMontantConsomme(Double montantConsomme) {
        this.montantConsomme = montantConsomme;
    }
}
