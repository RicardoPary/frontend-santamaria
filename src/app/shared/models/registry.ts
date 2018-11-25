export class Registry {
  company: String;
  date: String;
  description: String;
  idBranch: number;
  name: String;
  observation: String;
  phone: String;
  type: String;
}

export class RegistryFilter {
  id: number;
  name: String;
  type: String;
  stock: number;
  description: String;
  salePrice: number;
  wholesalePrice: number;
  purchasePrice: number;
  marke: String;
  discount: number;
  barcode: String;
}

export class FilterRegistry {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  registry: RegistryFilter = new RegistryFilter();
}
