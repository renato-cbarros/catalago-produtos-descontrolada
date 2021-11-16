import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { MOCK_LIST_PRODUCTS } from 'src/app/shared/mocks/response-list-products.mock';
import { Product } from 'src/app/shared/models/Product.model';
import { environment } from 'src/environments/environment';
import { GetAllProducts } from './models/getAllProducts';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL_GET_ALL_PAGED = `${environment.BASE_API_URL}${environment.EMAIL_LOJA}/produtos?pagina=1&tamanhoDaPagina=5`;
  const URL_GET_BY_ID = `${environment.BASE_API_URL}${environment.EMAIL_LOJA}/produtos/013619f2-e316-4a41-ae82-2cb761a2cafc`;
  const URL_POST = `${environment.BASE_API_URL}${environment.EMAIL_LOJA}/produtos`;
  const URL_PUT = `${environment.BASE_API_URL}${environment.EMAIL_LOJA}/produtos/013619f2-e316-4a41-ae82-2cb761a2cafc`;
  const URL_DELETE = `${environment.BASE_API_URL}${environment.EMAIL_LOJA}/produtos/013619f2-e316-4a41-ae82-2cb761a2cafc`;

  const MOCK_LIST_PAGED: GetAllProducts = MOCK_LIST_PRODUCTS;
  const MOCK_GET_BY_ID: Product = MOCK_LIST_PRODUCTS.produtos[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) should post product', (done) => {
    service.postProduct(MOCK_LIST_PRODUCTS.produtos[0]).subscribe((res) => {
      expect(res.error).toBeFalsy();
      expect(res.data).toBeFalsy();

      done();
    });

    const req = httpTestingController.expectOne(URL_POST);
    req.flush(null);

    expect(req.request.method).toEqual('POST');
  });

  it('(U) should put product', (done) => {
    service.putProduct(MOCK_LIST_PRODUCTS.produtos[0]).subscribe((res) => {
      expect(res.error).toBeFalsy();
      expect(res.data).toBeFalsy();

      done();
    });

    const req = httpTestingController.expectOne(URL_PUT);
    req.flush(null);

    expect(req.request.method).toEqual('PUT');
  });

  it('(U) should delete product', (done) => {
    service.deleteProduct(MOCK_LIST_PRODUCTS.produtos[0]).subscribe((res) => {
      expect(res.error).toBeFalsy();
      expect(res.data).toBeFalsy();

      done();
    });

    const req = httpTestingController.expectOne(URL_DELETE);
    req.flush(null);

    expect(req.request.method).toEqual('DELETE');
  });

  it('(U) should get all products paged', (done) => {
    service
      .getProductsPaged({ pagina: 1, tamanhoDaPagina: 5 })
      .subscribe((res: GetAllProducts) => {
        expect(res.totalDeProdutos).toEqual(17);
        expect(res.produtos[0].nome).toEqual('produto 20');
        expect(res.produtos[4].nome).toEqual('produto 16');

        done();
      });

    const req = httpTestingController.expectOne(URL_GET_ALL_PAGED);
    req.flush(MOCK_LIST_PAGED);

    expect(req.request.method).toEqual('GET');
  });

  it('(U) should get product by id', (done) => {
    service
      .getProductById('013619f2-e316-4a41-ae82-2cb761a2cafc')
      .subscribe((res: Product) => {
        expect(res.nome).toEqual('produto 20');
        expect(res.emailDaLoja).toEqual(
          'renato.barros_test_descontrolada@email.com'
        );

        done();
      });

    const req = httpTestingController.expectOne(URL_GET_BY_ID);
    req.flush(MOCK_GET_BY_ID);

    expect(req.request.method).toEqual('GET');
  });
});
