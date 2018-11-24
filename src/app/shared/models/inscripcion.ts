export class Inscripcion {
  name: String;
}

export class InscripcionFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  inscripcion: Inscripcion = new Inscripcion();
}
