import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { ProductTypes } from 'src/app/shared/models/Product-types-enum.model';
import { Product } from 'src/app/shared/models/Product.model';

import { ProductService } from 'src/app/core/services/product/product.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  productData!: Product;

  // Form settings
  formDataProduct!: FormGroup;
  productTypes = [ProductTypes[1], ProductTypes[2]];

  currentDate = new Date().toISOString().slice(0, 16);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private productService: ProductService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((data) => String(data.id).trim()),
        filter((id) => id !== 'undefined' && id.length > 0),
        switchMap((id) => this.productService.getProductById(id)),
        take(1)
      )
      .subscribe((res) => {
        this.productData = res;
        this.formDataProductInstance();
      });

    this.formDataProductInstance();
  }

  formDataProductInstance = () => {
    this.formDataProduct = this.formBuilder.group({
      emailDaLoja: [environment.EMAIL_LOJA, Validators.required],
      id: [this.productData?.id],
      nome: [this.productData?.nome, Validators.required],
      precoDeVenda: [this.productData?.precoDeVenda, Validators.required],
      descricao: [this.productData?.descricao, Validators.required],
      quantidade: [this.productData?.quantidade, Validators.required],
      tipo: [
        this.productData?.tipo ? ProductTypes[this.productData?.tipo] : null,
        Validators.required,
      ],
      dataDeValidade: [this.productData?.dataDeValidade, Validators.required],
    });
  };

  onSubmit = (option: string) => {
    this.formDataProduct.markAllAsTouched();
    this.formDataProduct.updateValueAndValidity();

    if (option === 'confirm' && this.formDataProduct.valid) {
      this.handlerOption(
        'post',
        {
          result: 'warn',
          title: 'Deseja seguir com Cadastro?',
          text: 'A operação não poderá ser revertida!',
          isBtn: true,
          btnTextYes: 'Confirmar',
          btnTextNo: 'Cancelar',
        },
        {
          result: 'error',
          title: 'Falha ao realizar cadastro de produto!',
          text: 'Revise os campos e realize uma nova tentativa!',
          isBtn: false,
        },
        {
          result: 'success',
          title: 'Cadastro de produto realizado com sucesso!',
          text: 'Dados salvos com sucesso!',
          isBtn: false,
        }
      );
    }
    if (option === 'edit' && this.formDataProduct.valid) {
      this.handlerOption(
        'put',
        {
          result: 'warn',
          title: 'Deseja seguir com a Edição?',
          text: 'A operação não poderá ser revertida!',
          isBtn: true,
          btnTextYes: 'Confirmar',
          btnTextNo: 'Cancelar',
        },
        {
          result: 'error',
          title: 'Falha ao realizar edição de produto!',
          text: 'Revise os campos e realize uma nova tentativa!',
          isBtn: false,
        },
        {
          result: 'success',
          title: 'Edição de produto realizada com sucesso!',
          text: 'Dados salvos com sucesso!',
          isBtn: false,
        }
      );
    }
    if (option === 'delete' && this.formDataProduct.valid) {
      this.handlerOption(
        'delete',
        {
          result: 'warn',
          title: 'Deseja seguir com a Deleção?',
          text: 'A operação não poderá ser revertida!',
          isBtn: true,
          btnTextYes: 'Confirmar',
          btnTextNo: 'Cancelar',
        },
        {
          result: 'error',
          title: 'Falha ao realizar deleção de produto!',
          text: 'Revise os campos e realize uma nova tentativa!',
          isBtn: false,
        },
        {
          result: 'success',
          title: 'Deleção de produto realizada com sucesso!',
          text: 'Dados deletados com sucesso!',
          isBtn: false,
        }
      );
    }
    if (option === 'cancel') {
      this.modalService
        .openDialog({
          result: 'warn',
          title: 'Deseja cancelar?',
          text: 'Os dados preenchidos serão perdidos!',
          isBtn: true,
          btnTextYes: 'Confirmar',
          btnTextNo: 'Cancelar',
        })
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/produto/listar']);
          }
        });
    }
  };

  handlerOption = (
    option: string,
    msgQuestion: {},
    msgFailed: {},
    msgSuccess: {}
  ) => {
    const productBody = this.formDataProduct.value;
    productBody.precoDeVenda = Number(productBody.precoDeVenda);
    productBody.tipo = Number(ProductTypes[productBody.tipo]);
    this.modalService
      .openDialog(msgQuestion)
      .pipe(
        filter((res) => res === true),
        switchMap((res) =>
          this.productService[
            option === 'put'
              ? 'putProduct'
              : option === 'delete'
              ? 'deleteProduct'
              : 'postProduct'
          ](this.formDataProduct.value as Product)
        ),
        switchMap((res) =>
          !res.error
            ? this.modalService.openDialog(msgSuccess)
            : this.modalService.openDialog(msgFailed)
        )
      )
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/produto/listar']);
        }
      });
  };
}
