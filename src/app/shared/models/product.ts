export class Product {
  name = '';
  category = '';
  inventory = null;
  stock = '';
  marke = '';
  salePrice = '';
  purchasePrice = '';
  wholesalePrice = '';
  discount = '';
  idBranch: number;
  idCategory: number;
}

export class ProductFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  product: Product = new Product();
}
