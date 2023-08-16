  import { Component, OnInit} from '@angular/core';

  import { Produit } from '../Models/Produit';
  import { ProduitService } from '../produit.service';

  @Component({
    selector: 'app-list-produit',
    templateUrl: './list-produit.component.html',
    styleUrls: ['./list-produit.component.css']
  })
      export class ListProduitComponent  implements OnInit {
        listproduits: any= [];
        message: any;
        ngOnInit(): void {
          this.AfficherProduits();

        }
        constructor(
          private service: ProduitService,
        ) {}
        AfficherProduits(): void {
          this.service.AfficherProduits().subscribe(res => {
      console.log(res)
      this.listproduits=res;
          }
          );
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
          
          
        }
        /*ModifierProduit() {
          this.service.ModifierProduit(this.produit).subscribe(
            (data) => {
              this.message = data;
              console.log('Product modified successfully:', data);
            },
            (error) => {
              console.error('Error modifying product:', error);
            }
          );
        }
        onUpdate(Produit: Produit) {
          // Navigate to the TransportComponent and pass the transport as a parameter
          this.router.navigate(['Produit/AjouterProduit'], { state: { Produit } });
        }*/

