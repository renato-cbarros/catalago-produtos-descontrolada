import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from 'src/app/shared/models/Product.model';
import { ProductTypes } from 'src/app/shared/models/Product-types-enum.model';

import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  // Material table settings
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nome',
    'precoDeVenda',
    'descricao',
    'quantidade',
    'tipo',
    'dataDeValidade',
  ];
  dataSource!: MatTableDataSource<Product>;

  // Material pagination settings
  length!: number;
  pageSize = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts = (page: number = 1, limit: number = 5) => {
    this.dataSource = new MatTableDataSource();

    this.productService
      .getProductsPaged({
        pagina: page,
        tamanhoDaPagina: limit,
      })
      .pipe(
        map((res) => {
          res.produtos.map((product: Product) => {
            product.tipoNome = ProductTypes[product.tipo];
          });
          return res;
        }),
        take(1)
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res?.produtos);
        this.length = res?.totalDeProdutos;
        this.dataSource.sort = this.sort;
      });
  };

  handlerChangePag = (event: PageEvent) => {
    this.listProducts(event.pageIndex + 1);
  };
}
