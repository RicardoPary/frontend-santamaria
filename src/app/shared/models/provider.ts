export class Provider {
  company = '';
  idBranch: number;
  name = '';
}

export class ProviderFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  provider: Provider = new Provider();
}
