
import { Component, OnInit,NgZone, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../Models/Produit';
import { ProduitService } from '../produit.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produit = new Produit(0,"",0,0);
  listproduits: Produit[] = [];
  message: any;
  searchQuery: string = '';

  ngOnInit(): void {
    this.AfficherProduits();

  }
  constructor(
    private service: ProduitService,
    private location: Location,
    private renderer: Renderer2,
    private route: ActivatedRoute,

  ) {}
  AjouterProduit() {
    let resp = this.service.AjouterProduit(this.produit);
    resp.subscribe((data) => {
      console.log(data);
      this.message = data;
      window.location.reload(); // Reload the page after adding the product

    });
  }
  AfficherProduits(): void {
    this.service.AfficherProduits().subscribe((data) => {
      this.listproduits = data as Produit[];
    });
  }
  
  submitProduit() {
    if (this.produit.id) {
      // Update existing product
      this.service.Modifier(this.produit.id, this.produit).subscribe(
        (response) => {
          console.log('Produit Modifié.');
          this.clearForm();
          this.AfficherProduits();
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } else {
      // Add new product
      this.service.AjouterProduit(this.produit).subscribe(
        (data) => {
          console.log(data);
          this.message = data;
          this.clearForm();
          this.AfficherProduits();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateProduit(idProduit: number) {
    const selectedProduit = this.listproduits.find((produit) => produit.id === idProduit);
    if (selectedProduit) {
      this.produit = { ...selectedProduit };
    }
  }

  clearForm() {
    this.produit = new Produit(0, '', 0, 0);
  }
  SupprimerProduit(idProduit: number) {
    this.service.SupprimerProduit(idProduit).subscribe(
      (response) => {
        console.log('Produit Supprimé.');
        // Update the feedbackList after successful deletion
        this.AfficherProduits();
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
  /*updateProduit(idProduit: number) {
    const selectedProduit = this.listproduits.find(produit => produit.id === idProduit);
    if (selectedProduit) {
      this.produit = { ...selectedProduit }; // Populate the form fields with the selected product's data
    }
  }
  /*
  public MAJ(produit: Produit) {
    this.produit = produit;
  }
 RechercherProduit(): void {
    if (this.searchQuery.trim() !== '') {
      this.service.RechercheProduit(this.searchQuery).subscribe((data) => {
        this.listproduits = data as Produit[];
      });
    } else {
      this.AfficherProduits();
    }
  }

 
  */
}
