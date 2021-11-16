export interface Product {
  id?: string;
  emailDaLoja: string;
  nome: string;
  precoDeVenda: number;
  descricao: string;
  quantidade: number;
  tipo: number;
  dataDeValidade: string;
  tipoNome?: string;
}
