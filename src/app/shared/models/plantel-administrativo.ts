export class PlantelAdministrativo {
  name: String;
}

export class PlantelAdministrativoFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  plantelAdministrativo: PlantelAdministrativo = new PlantelAdministrativo();
}
