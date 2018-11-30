export class ActividadCivica {
  name: String;
}

export class ActividadCivicaFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  actividadCivica: ActividadCivica = new ActividadCivica();
}
