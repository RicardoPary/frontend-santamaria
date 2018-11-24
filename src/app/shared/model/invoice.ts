export class Invoice {
  client: Client = new Client();
  discount = 0;
  idBox: number;
  idBranch: number;
  idEconomicActivity: number;
  note = '';
  observation = '';
  delibery = false;
  methodType = 'EFECTIVO';
  purchaseDate = '';
  purchaseDetails: PurchaseDetails[] = [];
  purchaseType = '';
  totalAmount = 0;
  type = '';
}

export class Client {
  email: String;
  name: String;
  nit = '';
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
  salePrice: number;
  stock: number;
  type: String;
  urlImage: String;
  wholesalePrice: number;
}

export class PurchaseDetails {
  detail: String = '';
  discount = 0;
  idProduct: number;
  product: Product = new Product();
  name = '';
  observation = '';
  price = 0;
  quantity = 0;
  subtotal = 0;
  statusTypeMethod = false;
  typeMethod = '';
  inventory: boolean;
}
