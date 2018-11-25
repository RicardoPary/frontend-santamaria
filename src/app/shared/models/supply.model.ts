export class Supply {
  name: String;
}

export class SupplyFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  supply: Supply = new Supply();
}
