import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Produit } from './Models/Produit';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private url = 'http://127.0.0.1:8000/api/produits';
REST_API : string ='http://127.0.0.1:8000/api/produits';
httpHeaders= new HttpHeaders().set('content-type','application/json');  
constructor(private http: HttpClient) { }

    AjouterProduit(data: Produit): Observable<any> {
      let API_URL=`${this.REST_API}`;

      return this.http.post(API_URL,data).pipe(catchError(this.handleError))
    }
   
    handleError(error:HttpErrorResponse){
      let errorMessage='';
      if(error.error instanceof ErrorEvent){
        errorMessage=error.error.message;
      }else{
        errorMessage=`Error Code : ${error.status}\n Message : ${error.message}`
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
    AfficherProduits(){
      return this.http.get(this.REST_API);
    }
    SupprimerProduit(id:number){
      return this.http.delete(`http://127.0.0.1:8000/api/deleteproduit/${id}`);
    }
    Modifier(id:number, data: any): Observable<any> {
      return this.http.put(`${this.REST_API}/${id}/edit`, data);
    }
  }

