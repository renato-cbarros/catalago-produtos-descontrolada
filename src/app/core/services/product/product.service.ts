import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Product } from 'src/app/shared/models/Product.model';
import { HttpService } from '../../http/http.service';
import { GetAllProducts } from './models/getAllProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private END_POINT = `/produtos`;

  constructor(
    private httpService: HttpService<GetAllProducts | Product | any>
  ) {}

  postProduct = (body: Product): Observable<{ error: boolean; data: any }> =>
    this.httpService.post$(this.END_POINT, body).pipe(
      switchMap((data) => of({ error: false, data: data })),
      catchError((err) => of({ error: true, data: err }))
    );

  putProduct = (body: Product): Observable<{ error: boolean; data: any }> =>
    this.httpService.put$(`${this.END_POINT}/${body.id}`, body).pipe(
      switchMap((data) => of({ error: false, data: data })),
      catchError((err) => of({ error: true, data: err }))
    );

  deleteProduct = (body: Product): Observable<{ error: boolean; data: any }> =>
    this.httpService.delete$(`${this.END_POINT}/${body.id}`).pipe(
      switchMap((data) => of({ error: false, data: data })),
      catchError((err) => of({ error: true, data: err }))
    );

  getProductById = (productId: string): Observable<Product> => {
    return this.httpService.get$(`${this.END_POINT}/${productId}`);
  };

  getProductsPaged = (searchData: {
    pagina: number;
    tamanhoDaPagina: number;
  }): Observable<GetAllProducts> => {
    let params = new HttpParams();
    params = params.append('pagina', searchData.pagina);
    params = params.append('tamanhoDaPagina', searchData.tamanhoDaPagina);

    return this.httpService.get$(this.END_POINT, params);
  };
}
