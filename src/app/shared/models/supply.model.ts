export class Supply {
  name = '';
  category = '';
  inventory = null;
  stock = '';
  marke = '';
  salePrice = '';
  purchasePrice = '';
  wholesalePrice = '';
  discount = '';
  idCategory: number;
}

export class SupplyFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  supply: Supply = new Supply();
}
