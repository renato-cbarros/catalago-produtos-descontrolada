import { Product } from 'src/app/shared/models/Product.model';

export interface GetAllProducts {
  produtos: Product[];
  totalDeProdutos: number;
}
