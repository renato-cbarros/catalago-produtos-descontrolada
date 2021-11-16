import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GetAllProducts } from 'src/app/core/services/product/models/getAllProducts';
import { ProductService } from 'src/app/core/services/product/product.service';
import { MOCK_LIST_PRODUCTS } from 'src/app/shared/mocks/response-list-products.mock';
import { environment } from 'src/environments/environment';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ProductService;

  const MOCK_LIST_PAGED: GetAllProducts = MOCK_LIST_PRODUCTS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ProductService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should get all investements', async () => {
    spyOn(service, 'getProductsPaged').and.returnValue(of(MOCK_LIST_PAGED));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getProductsPaged).toHaveBeenCalledWith({
      pagina: 1,
      tamanhoDaPagina: 5,
    });

    expect(component.length).toEqual(17);
  });
});
