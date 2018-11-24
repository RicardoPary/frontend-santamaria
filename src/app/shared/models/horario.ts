export class Horario {
  name: String;
}

export class HorarioFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  horario: Horario = new Horario();
}
