package com.kenza.dotation.dotation_stage_barrid.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "client")
public class Client {

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getCarteSejour() {
        return carteSejour;
    }

    public void setCarteSejour(String carteSejour) {
        this.carteSejour = carteSejour;
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

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idClient;

    private String cin;
    private String carteSejour;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;

}

