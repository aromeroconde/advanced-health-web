export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  category: string;
  subcategory?: string;
  presentation?: string;
  flavor?: string;
  benefits?: string;
  lineaFuncional?: string;
  etiqueta?: string;
  destacado: boolean;
  brand: 'FuXion' | 'gudd';
  source: 'fuxion' | 'gudd';
  marca: string;
  urlCompra?: string;
  modoUso?: string;
  imagenUrl?: string;
}
