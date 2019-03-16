export class InventoryFilter {
  detail: String;
}

export class FilterInventory {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  product: InventoryFilter = new InventoryFilter();
}

export class Category {
  description: String;
  id: number;
  imageCache: String;
  imageName: String;
  imageUrl: String;
  name: String;
  type: String;
}

export class Product {
  barcode: String;
  description: String;
  discount: number;
  id: number;
  idBranch: number;
  idCategory: number;
  imageCache: String;
  imageName: String;
  inventory: boolean;
  marke: String;
  name: String;
  purchasePrice: number;
  alePrice: number;
  stock: number;
  type: String;
  urlImage: String;
  wholesalePrice: number;
}

export class Provider {
  company: String;
  date: String;
  description: String;
  idBranch: number;
  observation: String;
  phone: String;
  type: String;
}

export class Inventory {
  company = '';
  detail = '';
  idProvider: number;
  name = '';
  phone = '';
  price = 1;
  product: Product = new Product();
  quantity = 1;
  type = '';
  filterText = '';
  selected = true;
}
