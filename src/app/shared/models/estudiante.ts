export class Estudiante {
  name: String;
}

export class EstudianteFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  estudiante: Estudiante = new Estudiante();
}
